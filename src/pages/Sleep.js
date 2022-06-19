import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";


function Sleep() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [sleepObject, setSleepObject] = useState({});
  const { register, handleSubmit, formState: {errors} } = useForm();

  useEffect(() => {
    axios.get(`http://localhost:3001/sleeps/byId/${id}`).then((res) => {
      setSleepObject(res.data);
    });
  }, [id]);

  const processForm = (data) => {
    const { waketime } = data;
    console.log(waketime);
    const body = {
      wakeuptime: dayjs(waketime).format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log("body...", body);

    axios.patch(`http://localhost:3001/sleeps/${id}`, body, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("this is body" + JSON.stringify(body));
        console.log(res.data);
        navigate("/olduser");
      });
  };

  // const wakeUp = () => {
  //   axios.put(`http://localhost:3001/sleeps/${id}`).then((res) => {
  //     navigate("/olduser");
  //   });
  // };
  const buttonText = sleepObject.wakeuptime ? "Edit" : "Wake up";

  return (
    <div className="sleepPage">
      <div className="leftSide">
        <div className="date"> {sleepObject.date} </div>
        <div className="sleeptime">Sleeptime: {new Date(sleepObject.sleeptime).toLocaleTimeString()} </div>
        <div className="username">Wake up: {new Date(sleepObject.wakeuptime).toLocaleTimeString()} </div>

        {/* <button className="wakeup" onClick={() => wakeUp()}>
          wakeuptime
        </button> */}
      </div>
      <div className="rightSide">
      <form onSubmit={handleSubmit((data) => processForm(data))}>
          <input
            type="datetime-local"
            {...register("waketime", { valueAsDate: true })} min="00:00" max="23:59"
          />
          {errors.waketime && <span>This field is required</span>} 
          <button className="button-sleep" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default Sleep;
