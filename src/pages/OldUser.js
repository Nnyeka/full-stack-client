import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarChart from "./BarChart";



function OldUser() {
  const [listOfSleeps, setListOfSleeps] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/sleeps", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setListOfSleeps(res.data);
        console.log("the list of old sleeps", res.data);
      });
    //empty array means refresh immediately page loads without depending on any change of value
  }, []);

  const [initialChartData, setInitialChartData] = useState({
    labels: [new Date().toLocaleDateString()],
    datasets: [
      {
        label: "Sleep Duration",
        data: ["8"],
      },
    ],
    // options: {
    //   resposive: true,
    //   scales:{
    //     xAxes: [{
    //       gridLines: {
    //         display: false,
    //       }
    //     }]
    //   }
    // }
  });

  let s2 = (time) => {
    const hm = time.split(/[:]/);
    const h = parseInt(hm[0]);
    const m = parseInt(hm[1]);
    console.log("this..." + hm, h, m);
    const num = h + m / 60;
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    setInitialChartData({
      labels: listOfSleeps.map((data) => new Date(data.date).toLocaleDateString({month:"2-digits", day:"2-digits"})),
      // datasets: listOfSleeps.map((data, index) => {
      //   return { key:index, label: "Sleep Duration", data: data.sleepduration };
      // }),

      datasets: [
        {
          label: "Sleep Duration",
          data: listOfSleeps
            .map((data) => s2(data.sleepduration))
            .filter((item) => item >= 0),
            barThickness:30,
            backgroundColor: "rgba(102, 153, 204, 0.80)", 
        },
      ],
      options: {
        legend: {
          position: false
        },
        bezierCurve: false,
        animation: {
          easing: "easeInOutBack"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              // You can change the color, the dash effect, the main axe color, etc.
              borderDash: [4, 2],
              color: "#ebedf2"
            }
          }],
          xAxes: [{
            gridLines: {
              // You can change the color, the dash effect, the main axe color, etc.
              borderDash: [4, 2],
              color: "#ebedf2"
            }
          }]

        },
        responsive: true,
        maintainAspectRatio: true
      }
      // reevaluate or trigger when value of listofsleeps changes
    });
  }, [listOfSleeps]);

  return (
    <div>
      {!listOfSleeps.length ? 
        <div className="main-profile">
          
          <h1>Create a Pattern</h1>
          <Link to="/createsleep">
            <button type="button">New Entry</button>
          </Link>
          </div>



:
<div className="main-profile">
    <h1>Create a Pattern</h1>
    <Link to="/createsleep">
      <button type="button">New Entry</button>
    </Link>
      
    <div className="profilepage">
    <div className="sleep-table">
    <table>
        <tr className="table-header">
          <th>date</th>
          <th>Sleep time</th>
          <th>Wake up time</th>
          <th>Sleep duration</th>
        </tr>
        
      {listOfSleeps.map(({ sleeptime, date, id, wakeuptime, sleepduration }, index) => {
        console.log("this is sleeptitme 1..", sleeptime);
        console.log("this is sleeptitme 2 new date..", new Date(sleeptime));
        console.log(
          "this is sleeptitme 3 to locale..",
          new Date(sleeptime).toLocaleTimeString()
        );
        return (

        
          
          <tr className="sleep"
            key={`sl-${index}`}
            onClick={() => {
              navigate(`/sleep/${id}`);
            }}>
              <td className="sleep-cell">{" "}
              {new Date(date).getDate()}/{new Date(date).getMonth()+1}{" "}</td>
              <td className="sleep-cell">{" "}
              {new Date(sleeptime).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}{" "}</td>
              <td className="sleep-cell">{" "}
              {new Date(wakeuptime).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}{" "}</td>
              <td className="sleep-cell">{sleepduration}HRS</td>
            </tr>
          /* <div className="sleeps">
          <div
            className="sleep"
            key={`sl-${index}`}
            onClick={() => {
              navigate(`/sleep/${id}`);
            }}
          >
            <div className="title"> {new Date(date).toLocaleDateString()} </div>
            <div className="body">
              {" "}
              {new Date(sleeptime).toLocaleTimeString()}{" "}
            </div>
            <div className="body">
              {" "}
              {new Date(wakeuptime).toLocaleTimeString()}{" "}
            </div>
          </div>
          </div> */
        );
      })}
      </table>

    </div>



      <div className="barchart">
        {console.log("initial Chart Data ,", initialChartData)}
        <BarChart chartData={initialChartData} />
      </div>
    </div>

    </div> }
    </div>
    

  );
}

export default OldUser;
