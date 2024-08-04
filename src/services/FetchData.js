// import React, { useState } from 'react';
// import axios from 'axios';
// import authHeader from './auth-header';
 
// const MOCK_URL = 'http://localhost:8080/api';
 
// const FetchDataComponent = () => {
//   const [mockarooUrl, setMockarooUrl] = useState('');
//   const [message, setMessage] = useState('');
 
//   const handleMockarooUrlChange = (e) => {
//     setMockarooUrl(e.target.value);
//   };
 
//   const replenishSIMCards = async () => {
//     try {
//       const response = await axios.post(`${MOCK_URL}/inventorymanager/replenish`, null, {
//         params: { url: mockarooUrl },
//         headers: {
//           ...authHeader(), // Include Bearer token from authHeader
//           'Content-Type': 'application/json', // Adjust headers as needed
//         },
//       });
//       console.log(response.data);
//       setMessage(response.data);
//     } catch (error) {
//       setMessage('Error occurred while replenishing SIM cards');
//       console.error('Replenish SIM Cards Error:', error);
//     }
//   };
 
//   const replenishMSISDN = async () => {
//     try {
//       const response = await axios.post(`${MOCK_URL}/inventorymanager/replenish-msisdn`, null, {
//         params: { url: mockarooUrl },
//         headers: {
//           ...authHeader(), // Include Bearer token from authHeader
//           'Content-Type': 'application/json', // Adjust headers as needed
//         },
//       });
//       setMessage(response.data);
//     } catch (error) {
//       setMessage('Error occurred while replenishing MSISDN numbers');
//       console.error('Replenish MSISDN Error:', error);
//     }
//   };
 
//   return (
//     <div>
//       <h2>Fetch Data</h2>
//       <input
//         type="url"
//         value={mockarooUrl}
//         onChange={handleMockarooUrlChange}
//         placeholder="Enter URL" style={{width:"300px"}}/> <br></br><br></br>
//       <button onClick={replenishSIMCards} style={{ backgroundColor: '#26A69A',border:"#26A69A"}}>Replenish SIM Cards</button><br></br><br></br>
//       <button onClick={replenishMSISDN} style={{ backgroundColor: '#26A69A',border:"#26A69A"}}>Replenish MSISDN</button>
//       <p>{message}</p>
//     </div>
//   );
// };
 
// export default FetchDataComponent;