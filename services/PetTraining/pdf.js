import * as Print from "expo-print";
const tableData = [
  ["Name", "Age", "Gender", "City", "Country"],
  ["John", "25", "Male", "New York", "USA"],
  ["Jane", "30", "Female", "London", "UK"],
  ["Bob", "40", "Male", "Paris", "France"],
];
const tableMarkup = `
<table>
  ${tableData
    .map(
      (row) => `
  <tr>
    ${row.map((cell) => `<td>${cell}</td>`).join("")}
  </tr>
  `
    )
    .join("")}
</table>`;
async function generatePdf() {
  const { uri } = await Print.printToFileAsync({
    html: tableMarkup,
    width: 612, // 8.5 inches in points
    height: 792, // 11 inches in points
    base64: false,
  });
  console.log(uri);
}
