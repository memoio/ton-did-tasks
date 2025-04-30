// import { PointHistory } from "@/components/api/point";
// import { createContext, useEffect, useState, useContext } from "react";
// import { useTonAddress } from '@tonconnect/ui-react';

// const PointContext = createContext();

// export const PointProvider = ({ children }) => {
//     const [length, setLength] = useState(1);
//     const [historyPage, setHistoryPage] = useState(1);
//     const [history, setHistory] = useState([
//         {
//             Name: "-",
//             Point: 0,
//             Time: "-",
//         }
//     ]);

//     // const { isConnected } = useTonAddress();

//     const updatePointHistory = async (page) => {
//         try {
//             const { accessToken } = await getToken();
//             if (accessToken === null) {
//                 autoLogin();
//                 return;
//             }

//             const { history, length } = await PointHistory(accessToken, page, 8);
//             setHistory(history);
//             setLength(length);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     const setPage = (page) => {
//         setHistoryPage(page);
//         updatePointHistory(page);
//     }

//     useEffect(() => {
//         if (isConnected && isLogin) {
//             updatePointHistory(historyPage);
//         }
//     }, [isLogin]);

//     return (
//         <PointContext.Provider value={{ history, length, historyPage, setPage }}>
//             {children}
//         </PointContext.Provider>
//     );
// }

// export const usePoint = () => {
//     const context = useContext(PointContext);

//     if (!context) {
//         throw new Error('usePoint must be used within a PointProvider');
//     }

//     return context;
// }