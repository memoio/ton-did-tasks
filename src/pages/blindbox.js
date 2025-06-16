import { useState, useEffect } from 'react';
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";

import { API_URL_V2 } from "../components/config/config";

export default function BlindBox() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [giftInfos, setGiftInfos] = useState([]); 
  const [pointsData, setPointsData] = useState({ 
    points: 0,
    todayPoints: 0,
    pointsRank: "0"
  }); 
  const [hasDrawnToday, setHasDrawnToday] = useState(false);
  const [serverDate, setServerDate] = useState(null); // Add state for server date

  const [resultIndex, setResultIndex] = useState(null);
  const rarityColors = ['#6b7280', '#3b82f6', '#facc15', '#f97316'];

  // get auth info
  const { userInfo, userProfile, address } = useAuth();

  const [isInitializing, setIsInitializing] = useState(true); // 加载状态

  // 奖品名称表
  const items = ['🎉 普通卡', '🧧 稀有卡', '💎 史诗卡', '👑 传说卡'];

  // 获取服务器当前日期
  const fetchServerDate = async () => {
    try {
      const response = await fetch(`${API_URL_V2.BLINDBOX_NOW}`);
      const data = await response.json();
      if (response.ok && data.result === 1) {
        setServerDate(data.datetime); // Assuming the API returns {result: 1, date: "YYYY-MM-DD"}
        console.log("API returned date:", data.datetime); 
      }
    } catch (error) {
      console.error("获取服务器日期失败：", error);
    }
  };

  // 检查是否有今天的抽取记录
  const checkTodayDraw = (gifts) => {
    if (!gifts || !Array.isArray(gifts) || gifts.length === 0 || !serverDate) return false;
    
    const today = serverDate.split(' ')[0]; 
    
    return gifts.some(gift => {
      if (!gift || !gift.CreatedAt) return false;
      const giftDate = gift.CreatedAt.split('T')[0];
      return giftDate === today;
    });
  };

  // 获取当前地址的所有礼品索引
  const fetchGiftList = async () => {
    if (!address) return;
  
    try {
      const response = await fetch(`${API_URL_V2.BLINDBOX_GIFTS}?address=${address}`);
      const data = await response.json();
  
      if (response.ok && data.result === 1 && Array.isArray(data.list)) {
        setGiftInfos(data.list);
        const drawnToday = checkTodayDraw(data.list);
        setHasDrawnToday(drawnToday); // 这里会正确设置状态
      } else {
        setGiftInfos([]);
        setHasDrawnToday(false);
      }
    } catch (error) {
      console.error("获取卡片列表失败：", error);
      setGiftInfos([]);
      setHasDrawnToday(false);
    }
  };

  // 积分查询函数
  const fetchPointsBalance = async () => {
    if (!address) return;
    
    try {
      const response = await fetch(`${API_URL_V2.AIRDROP_USER_INFO}?address=${address}`);
      const data = await response.json();
      
      if (response.ok && data.result === 1) {
        setPointsData({
          points: data.data.points || 0,
          todayPoints: data.data.todayPoints || 0,
          pointsRank: data.data.pointsRank || "0"
        });
      } else {
        setPointsData({
          points: 0,
          todayPoints: 0,
          pointsRank: "0"
        });
      }
    } catch (error) {
      console.error("获取积分信息失败：", error);
      setPointsData({
        points: 0,
        todayPoints: 0,
        pointsRank: "0"
      });
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsInitializing(true); // 开始加载
      try {
        await fetchServerDate();
        await fetchGiftList();
        await fetchPointsBalance();
      } finally {
        setIsInitializing(false); // 结束加载
      }
    };
    fetchAllData();
  }, [address, serverDate]);

  // play blindbox (free)
  const handleDrawFree = async () => {
    if (hasDrawnToday || isInitializing) { // 添加初始化检查
      setResult("⚠️ 今天已经抽过卡了，请使用积分抽取");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      console.log("address:", address);

      const response = await fetch(`${API_URL_V2.BLINDBOX_PLAY}?address=${address}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 根据后端要求调整
        },
      });
      const data = await response.json();
      console.log("index:", data.index);

      if (response.ok && typeof data.index === 'number' && data.index >= 0 && data.index < items.length) {
        setResult(items[data.index]);
        setResultIndex(data.index);
        setHasDrawnToday(true); // 立即更新状态

        // 刷新数据（但不会影响 hasDrawnToday）
        await fetchGiftList();
        await fetchPointsBalance();
      } else {
        setResult("❌ 抽奖失败，请稍后再试");
        setResultIndex(null);
      }
    } catch (error) {
      console.error("Blind box draw failed:", error);
      setResult("⚠️ 网络错误，请检查连接");
    }

    setLoading(false);
  };

  // play blindbox (using points)
  const handleDrawPoints = async () => {
    if (pointsData.points < 10) {
      setResult("⚠️ 积分不足，至少需要10积分");
      return;
    }
    
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL_V2.BLINDBOX_PLAY_POINTS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address })
      });

      const data = await response.json();

      if (response.ok && typeof data.index === 'number' && data.index >= 0 && data.index < items.length) {
        setResult(items[data.index]);
        setResultIndex(data.index);
        fetchGiftList();
        fetchPointsBalance();
      } else {
        setResult("❌ 抽奖失败: " + (data.message || "请稍后再试"));
        setResultIndex(null);
      }
    } catch (error) {
      console.error("Points draw failed:", error);
      setResult("⚠️ 网络错误，请检查连接");
    }

    setLoading(false);
  };

  // 判断按钮状态和文字
  const isWalletConnected = !!address;
  const getButtonText = () => {
    if (!isWalletConnected) return '先连接钱包';
    if (loading || isInitializing) return '加载中...'; // 添加初始化状态
    return hasDrawnToday 
      ? (pointsData.points < 10 ? '积分不足' : '积分抽取')
      : '免费抽取';
  };

  const isButtonDisabled = () => {
    if (!isWalletConnected) return true;
    if (loading || isInitializing) return true; // 添加初始化检查
    return hasDrawnToday && pointsData.points < 10;
  };

  return (
    <>
      {/* show current points */}
      <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '0.5rem' }}>💰</span>
          当前积分: {pointsData.points}
        </div>

        {/* 主容器使用flex布局 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          padding: '2rem 1rem 6rem',
          boxSizing: 'border-box',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          {/* 抽奖区域 */}
          <div style={{
            flex: 0,
            paddingBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* 抽奖按钮 */}
            <button
              onClick={hasDrawnToday ? handleDrawPoints : handleDrawFree}
              disabled={isButtonDisabled()}
              style={{
                background: isButtonDisabled() 
                  ? '#cccccc' 
                  : 'linear-gradient(135deg, #ff8a00, #e52e71)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                fontSize: '1.2rem',
                borderRadius: '999px',
                cursor: isButtonDisabled() ? 'not-allowed' : 'pointer',
                opacity: isButtonDisabled() ? 0.6 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              {getButtonText()}
            </button>

            {/* 抽奖结果容器 */}
              <div style={{
              minHeight: '40px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0.5rem 0',
              transition: 'opacity 0.3s ease'
              }}>
              {result && (
              <div style={{
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                border: '1px solid #f97316',
                animation: 'fadeIn 0.3s ease-out',
                whiteSpace: 'nowrap',
                color: resultIndex !== null ? rarityColors[resultIndex] : '#000'
              }}>
                {result}
              </div>
            )}
              </div>
          </div>

          {/* 卡包区域 */}
          <div style={{ 
            width: '100%',
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e5e7eb',
            marginTop: '1rem', 
            minHeight: '240px'
          }}>
          <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#f97316'
          }}>
              📦 我的卡包
          </h2>

          {giftInfos.length === 0 ? (
              <p style={{
              textAlign: 'center',
              color: '#64748b',
              padding: '1rem'
              }}>卡包是空的，快来抽卡吧！</p>
          ) : (
              <div style={{ 
              maxHeight: '100%',
              overflowY: 'auto',
              }}>
              <ul style={{ 
                  margin: 0, 
                  paddingLeft: '1.5rem',
                  listStyleType: 'none'
              }}>
                  {giftInfos.map((gift, idx) => {
                  const index = Number(gift.Index); 
                  const itemName = items[index] || `❓未知卡片(index=${gift.Index})`;
                  const rarityColors = ['#6b7280', '#3b82f6', '#facc15', '#f97316'];

                  return (
                      <li key={idx} style={{ 
                          marginBottom: '0.5rem',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}>
                      <span style={{ color: rarityColors[index] }}>{itemName}</span>
                      <span style={{ fontWeight: 'bold' }}>× {gift.Count}</span>
                      </li>
                  );
                  })}
              </ul>
              </div>
          )}
          </div>

        </div>

        <Footer active="blindbox" />

        {/* 添加一些简单的动画样式 */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1.05); }
          }
        `}</style>
    </>
  );
}