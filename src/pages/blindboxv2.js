import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";

import { API_URL_V2 } from "@/components/config/config";

const BlindBoxV2 = () => {
  const [boxes, setBoxes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [latestPrize, setLatestPrize] = useState(null);
  const [showPointsChange, setShowPointsChange] = useState(false);

  const { userInfo, subPoint, address } = useAuth();

  const [freeDrawMessage, setFreeDrawMessage] = useState(null);

  const COST_POINTS = 200

  // 获取礼品库数据
  const fetchBoxes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL_V2.BLINDBOX_GET_BOXES}?address=${address}`);
      if (response.data.result === 1) {
        setBoxes(response.data.boxes || []);
      } else {
        setError(response.data.error || "获取礼品库失败");
      }
    } catch (err) {
      setError("请求失败，请稍后重试");
      console.error("获取礼品库错误:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 免费抽取
  const handleFreeDraw = async () => {
    try {
      const response = await axios.post(`${API_URL_V2.ACTIVITY_FREE_BLINDBOX}`,
        { address: address },
        { headers: { 'Authorization': 'Bearer 123' } }
      );

      // 2 for no free draw left
      if (response.data.result === 2) {
        console.log("free draw over")
        setFreeDrawMessage("免费抽取次数不足，请参与活动获取免费抽取次数"); 
        setError("免费抽取次数不足" || "积分抽取失败");
      } else
      // -1 for error
      if (response.data.result === -1) {
        setFreeDrawMessage(null); 
        setError(response.data.error || "免费抽取失败");
      } else { // draw ok
        setFreeDrawMessage(null); 
        setLatestPrize(response.data.prize);
        await fetchBoxes();
      }
    } catch (err) {
        setFreeDrawMessage(null); 
        setError("请求失败，请稍后重试");
        console.error("免费抽取错误:", err);
      } finally {
        setIsDrawing(false);
      }
  };

  // 积分抽取
  const handlePointsDraw = async () => {
    if (isDrawing || userInfo.points < COST_POINTS) return;
    
    setIsDrawing(true);
    try {
      const response = await axios.post(`${API_URL_V2.ACTIVITY_POINTS_BLINDBOX}`,
        { address: address },
        { headers: { 'Authorization': 'Bearer 123' } }
      );

      if (response.data.result === 2) {
        console.log("3 points draw over")
        setError("每天只能使用3次积分抽取" || "积分抽取失败");
      } else
      if (response.data.result === -1) {
        console.log("points draw failed")
        setError(response.data.error || "积分抽取错误");
      } else {// draw ok and sub points
        setLatestPrize(response.data.prize);
        setShowPointsChange(true);
        
        // 更新用户积分
        subPoint(COST_POINTS);

        await fetchBoxes();
        setTimeout(() => setShowPointsChange(false), 2000);
      }
    } catch (err) {
      setError("请求失败，请稍后重试");
      console.error("积分抽取错误:", err);
    } finally {
      setIsDrawing(false);
    }
  };

  // 关闭错误弹窗
  const closeErrorModal = () => {
    setError(null);
  };

  useEffect(() => {
    if (address) { // 只有当address有值时才会执行
      fetchBoxes();
    }
  }, [address]); // 依赖address变化

  return (
    <div className="blind-box-container">
      <div className="user-points">
        当前积分: {userInfo.points}
        {showPointsChange && (
          <span className="points-change">-{COST_POINTS}</span>
        )}
      </div>

      <div className="header">
        <h1>盲盒抽取游戏</h1>
      </div>
      
      <div className="content-wrapper">
        <div className="button-group">
          <button 
            className="draw-button free-draw" 
            onClick={handleFreeDraw}
            disabled={isLoading || isDrawing}
          >
            免费抽取
          </button>
          <button 
            className="draw-button points-draw" 
            onClick={handlePointsDraw}
            disabled={isLoading || isDrawing || userInfo.points < COST_POINTS}
          >
            {isDrawing ? '抽取中...' : '积分抽取'}
          </button>
        </div>

        {(freeDrawMessage || (userInfo.points < COST_POINTS && "积分不足，请先获取积分")) && (
        <p className="points-notice">
            {freeDrawMessage || "积分不足，请先获取积分"}
        </p>
        )}
        
        {latestPrize && (
          <div className="latest-prize-notice">
            <span className="notice-label">最新抽到: </span>
            <span className="prize-value">{latestPrize}</span>
          </div>
        )}
        
        <div className="gift-box-container">
          <div className="gift-box">
            <div className="column-headers">
              <span>奖品名称</span>
              <span>积分点数</span>
              <span>抽取日期</span>
            </div>
            
            <div className="gift-list-wrapper">
              {isLoading ? (
                <p className="loading-text">加载中...</p>
              ) : boxes.length === 0 ? (
                <p className="empty-text">暂无礼品，快去抽取吧！</p>
              ) : (
                <ul className="gift-list">
                  {boxes.sort((a, b) => b.ID - a.ID).map((box) => (
                    <li key={box.ID} className="gift-item">
                      <span className="gift-prize">{box.Prize}</span>
                      <span className="gift-points">{box.Points}</span>
                      <span className="gift-date">
                        {new Date(box.CreatedAt).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeErrorModal}>&times;</span>
            <p>{error}</p>
            <button onClick={closeErrorModal}>确定</button>
          </div>
        </div>
      )}

      <Footer active="blindboxv2" />

      <style jsx>{`
        .blind-box-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .user-points {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: #f8f9fa;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          color: #6c757d;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          font-size: 14px;
        }
        
        .points-change {
          color: red;
          margin-left: 8px;
          animation: fadeOut 2s forwards;
        }
        
        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(-20px); }
        }
        
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .header h1 {
          font-size: 24px;
          color: #333;
          margin: 0;
        }
        
        .content-wrapper {
          margin-top: 60px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .button-group {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 15px;
        }
        
        .draw-button {
          padding: 10px 20px;
          font-size: 14px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .draw-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background-color: #cccccc !important;
        }
        
        .free-draw {
          background-color: #4CAF50;
          color: white;
        }
        
        .points-draw {
          background-color: #2196F3;
          color: white;
        }
        
        .draw-button:hover:not(:disabled) {
          opacity: 0.8;
          transform: scale(1.05);
        }
        
        .points-notice {
          font-size: 12px;
          color: #666;
          margin: -10px 0 15px;
          text-align: center;
        }
        
        .latest-prize-notice {
          background-color: #fff9e6;
          border: 1px solid #ffd700;
          border-radius: 4px;
          padding: 6px 12px;
          margin: 0 auto 15px;
          text-align: center;
          width: 80%;
          max-width: 400px;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .notice-label {
          color: #ff9900;
          font-weight: bold;
          margin-right: 5px;
        }
        
        .prize-value {
          color: #333;
          font-weight: bold;
        }
        
        .gift-box-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 220px);
          margin-top: 10px;
        }
        
        .gift-box {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 0;
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .column-headers {
          display: grid;
          grid-template-columns: 5fr 1.2fr 1.5fr;
          gap: 10px;
          background-color: #f5f5f5;
          font-weight: bold;
          padding: 10px 15px;
          border-bottom: 2px solid #ddd;
          margin: 0 -15px;
          position: sticky;
          top: 0;
          z-index: 1;
          font-size: 14px;
        }
        
        .gift-list-wrapper {
          flex: 1;
          overflow-y: auto;
          padding: 0 15px;
        }
        
        .gift-list {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
        
        .gift-item {
          display: grid;
          grid-template-columns: 5fr 1.2fr 1.5fr;
          gap: 10px;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }
        
        .gift-item:last-child {
          border-bottom: none;
        }
        
        .gift-prize {
          text-align: left;
          word-break: break-word;
        }
        
        .gift-points {
          text-align: center;
          min-width: 60px;
        }
        
        .gift-date {
          text-align: right;
          white-space: nowrap;
        }
        
        .loading-text,
        .empty-text {
          padding: 15px;
          text-align: center;
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        
        .gift-list-wrapper::-webkit-scrollbar {
          width: 8px;
        }
        
        .gift-list-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .gift-list-wrapper::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        .gift-list-wrapper::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        .modal {
          position: fixed;
          z-index: 10;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.4);
        }
        
        .modal-content {
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 400px;
          border-radius: 5px;
          text-align: center;
        }
        
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }
        
        .close:hover {
          color: black;
        }
      `}</style>
    </div>
  );
};

export default BlindBoxV2;