import Head from 'next/head'
import axios from 'axios'



export default function Signup() {
    return (
      <>
        <Head>
          
          <meta name="description" content="Next-Express-App" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Signup</h1>
        <SignupForm></SignupForm>
      </>
    )
  }

  function SignupForm(){
    return (
      <>
        <form id='signupForm'>
          <div className="container">
            
            <p>Please fill in this form to create an account.</p>
            <hr />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />

            <label htmlFor="repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="repeat" required />
            
            <label>
              <input type="checkbox" defaultChecked name="remember" /> Remember me
            </label>
            
            <div className="clearfix">
              <button type="button" className="cancelbtn">Cancel</button>
              <button className="signupbtn" onClick={submitUser}>Sign Up</button>
            </div>
          </div>
        </form>
        <h1 id='signup-error'></h1>
      </>
    )
  }

  async function submitUser(e){
    e.preventDefault()
    let form = document.getElementById("signupForm")
    let errorMsg = document.getElementById("signup-error")
    //console.log(form);
    const formData = new FormData(form);

    try {
      let res = await axios({
        method: 'post',
        url: '/user/signup',
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