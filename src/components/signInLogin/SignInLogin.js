import React, { useRef, useState } from 'react';
import './SignInLogin.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
const SignInLogin = () => {

    let history = useHistory();
    
    const Login_email_Ref = useRef();
    const Login_password_Ref = useRef();

    const SignIn_username_Ref = useRef();
    const SignIn_email_Ref = useRef();
    const SignIn_password_Ref = useRef();

    const [ShowLoginForm,setShowLoginForm] = useState(true);

    // Login form action
    const Login = (e) => {
        e.preventDefault();
        const user_Login_data = {EMAIL:Login_email_Ref.current.value,PASSWORD :Login_password_Ref.current.value};
        console.log(user_Login_data);

        Axios.post("http://localhost:8000/Login",user_Login_data).then((res)=>{
            if(res.data.status === 'success')
            {

                console.log(res.data.user_id);
                alert('Login Sucessfully');
                history.push({pathname:'/expansive/'+res.data.user_name+'/'+res.data.user_id});
            }
            else if(res.data.status === 'invalid')
            {
                alert('Invalid EMAIL ID , PASSWORD!!!!');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

     // Register form action
    const Register = (e) => {
        e.preventDefault();  
        const user_Register_data = {USERNAME:SignIn_username_Ref.current.value,EMAIL:SignIn_email_Ref.current.value,PASSWORD :SignIn_password_Ref.current.value};
        Axios.post("http://localhost:8000/Signup",user_Register_data).then((res)=>{
            if(res.data.status === 'success')
            {
                alert('Registration Sucessfully');
                history.push({pathname:'/expansive/'+res.data.user_name+'/'+res.data.user_id});
            }
            else if(res.data.status === 'error')
            {
                alert(res.data.error_detail);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <div className='form'>

        <div className='Login' style={{display:ShowLoginForm ? 'block' : 'none'}}>
            <h1>Login</h1>
            <form onSubmit={Login}>
                <label>EMAIL ID</label>
                <input type='text' ref={Login_email_Ref} required></input>
                <label>PASSWORD</label>
                <input type='password' ref={Login_password_Ref} required></input>
                <button onClick={(e)=>{e.preventDefault(); setShowLoginForm(false)}}>New User?</button>
                <input type='submit' value="Login"></input>
            </form>
        </div>
        <div className='Register' style={{display:ShowLoginForm ? 'none' : 'block'}}>
            <h1>Register</h1>
            <form onSubmit={Register}>
                <label>USERNAME</label>
                <input type='text' ref={SignIn_username_Ref} required></input>
                <label>EMAIL ID</label>
                <input type='text' ref={SignIn_email_Ref} required></input>
                <label>PASSWORD</label>
                <input type='password' ref={SignIn_password_Ref} required></input>
                <button onClick={(e)=>{e.preventDefault(); setShowLoginForm(true)}}>Go Login?</button>
                <input type='submit' value="Register" ></input>
            </form>
        </div>

      
    </div>
  )
}

export default SignInLogin
