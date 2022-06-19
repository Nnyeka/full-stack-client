import React from 'react'
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from 'axios';
import {Link,  useNavigate } from 'react-router-dom';


function Registration() {
    let navigate = useNavigate();
    const initialValues = {
        username: "",
        password:"",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
            navigate("/")
        })
    }
  return (
    <div className='form'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='login-form errors-target'> 
                <Field
                id="inputCreateSleep"
                name="username"
                placeholder="(Ex.Jane...)"
                />
                <ErrorMessage name="username" component="span"/>
                <Field
                type="password"
                id="inputCreateSleep"
                name="password"
                placeholder="password"
                />
                 <ErrorMessage name="password" component="span"/>
                <button type='submit'>Register</button>
                <Link to="/login">
    Already have an account? <span className="signin">sign in</span>
  </Link>
                
            </Form>

        </Formik>
    </div>
  )
}


// function Registration() {

//     let navigate = useNavigate();

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const onSubmit = () => {

//         const data = {
//             username: username,
//             password: password,
//           };

//         axios.post("http://localhost:3001/auth", data).then(() => {
//             console.log(data);
//             navigate("/")
//         })
//     }

//     return (
//         <div className="register">
//           <input type="text" onChange={(e) => setUsername(e.target.value)} />
//           <input type="password" onChange={(e) => setPassword(e.target.value)} />
    
//           <button onClick={onSubmit}>Register</button>
//         </div>
//       );
// }

export default Registration


