import { useState, useEffect } from 'react';
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";

export default function BlindBox() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [giftIndexes, setGiftIndexes] = useState([]);
  const [giftNames, setGiftNames] = useState([]);

  // get auth info
  const { userInfo, userProfile, address } = useAuth();

  // 奖品名称表
  const items = ['🎁 奖品 A', '🎉 奖品 B', '🧧 奖品 C', '🧧 奖品 D', '😅 谢谢参与'];

  // 获取当前地址的所有礼品索引
  const fetchGiftList = async () => {
    if (!address) return;

    try {
      const response = await fetch(`http://localhost:8080/v2/blindbox/gifts?address=${address}`);
      const data = await response.json();

      if (response.ok && data.result === 1 && Array.isArray(data.list)) {
        setGiftIndexes(data.list);
        setGiftNames(data.list.map(index => items[index] || '❓未知奖品'));
      } else {
        setGiftIndexes([]);
        setGiftNames([]);
      }
    } catch (error) {
      console.error("获取礼品列表失败：", error);
      setGiftIndexes([]);
      setGiftNames([]);
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
        {loading ? '抽取中...' : '🎉 开始抽奖'}
        </button>
        
        {result && <div style={{ marginTop: '1rem', fontSize: '1.5rem' }}>{result}</div>}

        <div style={{ marginTop: '2rem', textAlign: 'left' }}>

        <h2>🎁 我的礼品列表</h2>
        {giftNames.length === 0 ? (
            <p>暂无抽奖记录</p>
        ) : (
            <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '0.5rem', borderRadius: '8px' }}>
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                {giftNames.map((name, idx) => (
                <li key={idx}>{name}</li>
                ))}
            </ul>
            </div>
        )}
        </div>

      </div>

      <Footer active="blindbox" />
    </>
  );
}
