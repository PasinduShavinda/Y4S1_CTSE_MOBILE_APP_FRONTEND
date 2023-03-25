import { getDocs, collection } from "firebase/firestore";
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { fireDB } from "../../database/firebaseConfig";

const generatePDF = async () => {
    const querySnapshot = await getDocs(collection(fireDB, "appointments"));
    const apdata = [];
    querySnapshot.forEach((doc) => {
        apdata.push({ id: doc.id, ...doc.data() });
    });
    const html = `
    <html>
    <head>
      <title>Appointment Details</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f2f2f2;
        }
        
        h1 {
          font-size: 36px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        p {
          font-size: 24px;
          margin: 10px 0;
        }
        
        .label {
          font-weight: bold;
        }
        
        .btn {
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: #fff;
          font-size: 20px;
          text-align: center;
          text-decoration: none;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        
        .btn:hover {
          background-color: #0062cc;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Appointment Details</h1>
        <p class="label">Reference Number:</p>
        <p>${apdata[0].id}</p>
        <p class="label">First Name:</p>
        <p>${apdata[0].fname}</p>
        <p class="label">Last Name:</p>
        <p>${apdata[0].lname}</p>
        <p class="label">Email:</p>
        <p>${apdata[0].email}</p>
        <p class="label">Contact Number:</p>
        <p>${apdata[0].contact}</p>
        <p class="label">Consultant:</p>
        <p>${apdata[0].vetName}</p>
        <p class="label">Reason:</p>
        <p>${apdata[0].reason}</p>
        <p class="label">Appointment Date:</p>
        <p>${apdata[0].appntDate}</p>
        <p class="label">Appointment Time:</p>
        <p>${apdata[0].appntTime}</p>
      </div>
    </body>
  </html>
    `;
    const file = await printToFileAsync({
        html: html,
        base64: false
    });
    await shareAsync(file.uri);
};

export default generatePDF;