import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import timeSince from "./TimeSinceCalc";

const generatepdf = async (list) => {
  const apdata = [];
  list.forEach((doc) => {
    apdata.push({ ...doc });
  });

  let tableRows = "";
  for (let i = 0; i < apdata.length; i++) {
    tableRows += `
      <tr>
        <td>${apdata[i].id}</td>
        <td>${timeSince(apdata[i].created)}</td>
        <td>${apdata[i].rating}</td>
        <td>${apdata[i].ratingCount}</td>

      </tr>
    `;
  }

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

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        margin-bottom: 20px;
      }

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border: 1px solid #ddd;
      }

      th {
        background-color: #9787b5;
        color: white;
        font-weight: bold;
      }

      .label {
        font-weight: bold;
      }
    </style>
      </head>

      <body>
        <div class="container">
          <h1>Summary Report - ${new Date().toLocaleDateString()}</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Created</th>
                <th>Current Rating</th>
                <th>Number of Reviews</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;
  const file = await printToFileAsync({
    html: html,
    base64: false,
  });
  await shareAsync(file.uri);
};

export default generatepdf;
