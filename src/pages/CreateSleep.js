import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useEffect } from "react";
import dayjs from "dayjs";



function CreateSleep() {
  let navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  //const [data, setData] = useState({})

  const processForm = (data) => {
    const { date } = data;
    console.log(date);
    const body = {


      date: dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
      sleeptime: dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log("body...", body);

    axios.post("http://localhost:3001/sleeps", body, {
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

  return (
    <form className="create-sleep" onSubmit={handleSubmit((data) => processForm(data))}>
      <input
        type="datetime-local"
        {...register("date", { valueAsDate: true })} min="00:00" max="23:59"
      />
      <button className="button-sleep" type="submit">Create Sleep</button>
    </form>
  );
}

export default CreateSleep;
