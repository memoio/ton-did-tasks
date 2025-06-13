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

  const [resultIndex, setResultIndex] = useState(null);
  const rarityColors = ['#6b7280', '#3b82f6', '#facc15', '#f97316'];

  // get auth info
  const { userInfo, userProfile, address } = useAuth();

  // 奖品名称表
  const items = ['🎉 普通卡', '🧧 稀有卡', '💎 史诗卡', '👑 传说卡'];

  // 检查是否有今天的抽取记录
  const checkTodayDraw = (gifts) => {
    if (!gifts || gifts.length === 0) return false;
    
    const today = new Date().toISOString().split('T')[0]; // 获取今天的日期字符串 YYYY-MM-DD
    return gifts.some(gift => {
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
        setGiftInfos(data.list); // save cards list 
        setHasDrawnToday(checkTodayDraw(data.list));
        console.log("list:",data.list);
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

  // 页面加载后首次获取
  useEffect(() => {
    fetchGiftList();
    fetchPointsBalance();
  }, [address]);

  // play blindbox (free)
  const handleDrawFree = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log("address:", address);

      const response = await fetch(`${API_URL_V2.BLINDBOX_PLAY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address })
      });

      const data = await response.json();
      console.log("index:", data.index);

      if (response.ok && typeof data.index === 'number' && data.index >= 0 && data.index < items.length) {
        setResult(items[data.index]);
        setResultIndex(data.index); // ⭐️ 新增这行
        fetchGiftList(); // 抽奖成功后刷新列表
        fetchPointsBalance(); // 更新积分
      } else {
        setResult("❌ 抽奖失败，请稍后再试");
        setResultIndex(null); // 重置 index
      }
    } catch (error) {
      console.error("Blind box draw failed:", error);
      setResult("⚠️ 网络错误，请检查连接");
    }

    setLoading(false);
  };

  // play blindbox (using points)
  const handleDrawPoints = async () => {
    // 这里你可以添加积分扣除逻辑
    // 目前先调用和免费抽取相同的逻辑
    await handleDrawFree();
  };

  // 判断是否显示"先连接钱包"
  const isWalletConnected = !!address;
  const buttonText = !isWalletConnected 
    ? '先连接钱包' 
    : loading 
      ? '抽取中...' 
      : hasDrawnToday 
        ? '积分抽取' 
        : '免费抽取';

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
        padding: '2rem 1rem 6rem', // 留足底部空间
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
            onClick={handleDrawFree}
            disabled={loading || !isWalletConnected}
            style={{
              background: 'linear-gradient(135deg, #ff8a00, #e52e71)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 2rem',
              fontSize: '1.2rem',
              borderRadius: '999px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              marginBottom: '1.5rem',
              position: 'relative',
              zIndex: 2
            }}
          >
            {buttonText}
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
              color: resultIndex !== null ? rarityColors[resultIndex] : '#000' // 动态颜色
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
            maxHeight: '100%',  // ✅ 让内部滚动不撑页面
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
                        backgroundColor: 'rgba(255,255,255,0.9)', // 稍微提亮
                        display: 'flex',
                        justifyContent: 'space-between',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)' // 可选：让每条卡片更有层次感
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
