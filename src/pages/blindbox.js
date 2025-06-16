import { useState, useEffect } from 'react';
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";

import { API_URL_V2 } from "../components/config/config";

export default function BlindBox() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [giftInfos, setGiftInfos] = useState([]); 

  // get auth info
  const { userInfo, userProfile, address } = useAuth();

  // 奖品名称表
  const items = ['🎁 普通卡A', '🎉 普通卡B', '🧧 稀有卡', '💎 史诗卡', '👑 传说卡'];

  // 获取当前地址的所有礼品索引
  const fetchGiftList = async () => {
    if (!address) return;
  
    try {
      const response = await fetch(`http://localhost:8080/v2/blindbox/gifts?address=${address}`);
      const data = await response.json();
  
      if (response.ok && data.result === 1 && Array.isArray(data.list)) {
        setGiftInfos(data.list); // 这里直接保存 GiftInfo 列表
        console.log("list:",data.list);
      } else {
        setGiftInfos([]);
      }
    } catch (error) {
      console.error("获取卡片列表失败：", error);
      setGiftInfos([]);
    }
  };

  // 页面加载后首次获取
  useEffect(() => {
    fetchGiftList();
  }, [address]);

  const handleDraw = async () => {
    setLoading(true);
    setResult(null);

    try {
      console.log("address:", address);

      const response = await fetch("http://localhost:8080/v2/blindbox/play", {
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
        fetchGiftList(); // 抽奖成功后刷新列表
      } else {
        setResult("❌ 抽奖失败，请稍后再试");
      }
    } catch (error) {
      console.error("Blind box draw failed:", error);
      setResult("⚠️ 网络错误，请检查连接");
    }

    setLoading(false);
  };

  return (
    <>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <button
        onClick={handleDraw}
        disabled={loading}
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
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        >
        {loading ? '抽取中...' : '🎉 开始抽卡'}
        </button>

        {result && <div style={{ marginTop: '1rem', fontSize: '1.5rem' }}>{result}</div>}

        <div style={{ marginTop: '2rem', textAlign: 'left' }}>

        <h2 style={{
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#f97316', // 橙色高亮
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
        }}>
        我的卡包
        </h2>

        {giftInfos.length === 0 ? (
        <p>卡包是空的</p>
        ) : (
        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '0.5rem', borderRadius: '8px' }}>
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
            {giftInfos.map((gift, idx) => {
            const index = Number(gift.Index); 
            const itemName = items[index] || `❓未知卡片(index=${gift.Index})`;

            return (
                <li key={idx}>
                {itemName} × {gift.Count}
                <br />
                </li>
            );
            })}
            </ul>
        </div>
        )}
        </div>

      </div>

      <Footer active="blindbox" />
    </>
  );
}
