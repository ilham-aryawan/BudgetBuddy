import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import { populationData } from './data.js';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)



function App() {
  const [items, setItems] = useState([]);
  const [data, setData]= useState({
    labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
    datasets:[
      {
        label:"First Dataset",
        data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 20, 58],
        backgroundColor:'yellow',
        borderColor:'green',
        tension:0.4,
        fill:true,
        pointStyle:'rect',
        pointBorderColor:'blue',
        pointBackgroundColor:'#fff',
        showLine:true
      }
    ]
  })

  const readExcel=(file)=>{
    const promise=new Promise((resolve, reject)=>{
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;

          const wb=XLSX.read(bufferArray, {type:'buffer'});

          const wsname=wb.SheetNames[0];

          const ws=wb.Sheets[wsname];

          const data=XLSX.utils.sheet_to_json(ws);

          resolve(data);
        };

        fileReader.onerror=((error)=>{
          reject(error);
        });
    });

    promise.then((d) => {
      setItems(d)
    });
  };


  return (
    <div className="App" style={{width:'800px', height:'800px'}}>
      <input 
        type="file" 
        onChange={(e)=>{
          const file=e.target.files[0];
          readExcel(file);
        }} 
      />

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.Item}>

              <td>{d.Description}</td>
            </tr>
          ))}
        </tbody>
      </table> 
      <Line data={populationData}>Hello</Line>
    </div>

  );
}

export default App;