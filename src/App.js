import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

var number = 200;
var spend = true;

function App() {
  const [data, setData]= useState({
    labels:["Jan","Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
    datasets:[
      {
        label:"Money",
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
  
  return (
    <div>
      <header className="App-header">
      <div id="box5"></div>
      <div id="box4"></div>
      <div id="box2"></div>
      <div id="box1"></div>
      <div id = "header">
        <h1>
        Monthly Budget
        </h1>
      </div>
      <div className="tab">
          <button id = "spentbtn" className="tablinks" onClick={()=>changeVariable(true)}>Spent</button>
          <button id = "earnedbtn" className="tablinks" onClick={()=>changeVariable(false)}>Earned</button>
      </div>

      <div id="Spent" className="tabcontent1">
        <h3>Spent</h3>
        <p>I spent money!</p>
        
      </div>

      <div id="Earned" className="tabcontent">
        <h3>Earned</h3>
        <p>I earned money!</p>
      </div>

      <div id="Initial" className="tabcontent">
        <h3>Initial</h3>
        <p>I have money!</p>
      </div>

      <div id="Delete" className="tabcontent1">
        <h3>Deleted</h3>
        <p>I deleted money!</p>
      </div>

      <div id = "box3"></div>
      <div className="graph" style={{width:'900px', height:'900px'}}>
      <Line data={data}>Hello</Line>
    </div> 
        <div class="update">
          <button id = "updatebtn" className="tablinks" onClick={()=>openCity("click", 'Spent', true)}>Update Entry</button>
      </div>
      <div class="update">
          <button id = "deletebtn" className="tablinks" onClick={()=>openCity("click", 'Delete', false)}>Delete Entry</button>
      </div>
      <div class="update">
          <button id = "enterbtn" className="tablinks" onClick={()=>openCity("click", 'Initial', false)}>Enter</button>
      </div>

      <div>
      <form>
    <input id = "datebtn" type="text" name="name" />
</form>
</div>

<div id = "budget">
  Enter Your Budget: 
</div>

<div>
<form>
    <input id = "budgetbtn" type="text" name="name" />
</form>
</div>

<div id = "dollarText1">
  $
</div>

<div id = "dateText1">
  Date: 
</div>

<div id = "dateText">
  Date: 
</div>

<div id = "valueText">
  Value:
</div>

<div id = "dollarText">
  $
</div>

<div>
      <form>
    <input id = "valuebtn" type="text" name="name" size = "900"/>
</form>
</div>

<div>
      <form>
    <input id = "datebtn1" type="text" name="name" />
</form>
</div>

      </header>
    </div>


  );
}

function openCity(evt, cityName, cit) {
  // Declare all variables
  if(spend && cit)
    cityName = "Spent";
  else if(!spend && cit)
    cityName = "Earned";
  var i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tabcontent = document.getElementsByClassName("tabcontent1");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += "active";
}

function changeVariable(val) {
  spend = val;
}

export default App;