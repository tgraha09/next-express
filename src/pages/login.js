import Head from 'next/head'
import axios from 'axios'
import React from 'react'
//import styles from '../components/styles/Login.module.css'
import { Navbar } from '@/components'

export default function Login() {
    return (
      <>
        <Head>
          
          <meta name="description" content="Next-Express-App" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar></Navbar>
        <h1 >Login</h1>
        
        <LoginForm></LoginForm>
      </>
    )
  }

  function LoginForm(){
    return (
      <div className='form-wrap'>
        
        <form id='loginForm' className='form'>
        <hr />

        <label htmlFor="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" required />

        <label htmlFor="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" required />

        <label>
          <input type="checkbox" defaultChecked name="remember" /> Remember me
        </label>

        <div className="clearfix">
          <button type="button" className="cancelbtn">Cancel</button>
          <button className="signupbtn" onClick={submitUser}>Login</button>
        </div>


            
        </form>
        <h1 id='login-error'></h1>
      </div>
    )
  }

  async function submitUser(e){
    e.preventDefault()
    let form = document.getElementById("loginForm")
    let errorMsg = document.getElementById("login-error")
    //console.log(form);
    const formData = new FormData(form);

    try {
      let res = await axios({
        method: 'post',
        url: '/user/login',
        data: 
        {
          email: formData.get('email'),
          psw: formData.get('psw')
        }
      }).then((response)=>{
        //console.log(response.data);
        window.location.href = response.data
      })
      //let data = await res.data;
      //console.log(data);
    } catch (error) {
      console.log(error.response.data); // this is the main part. Use the response property from the error object
      console.log(errorMsg);
      errorMsg.innerText = error.response.data
      return error.response;
    }
  }