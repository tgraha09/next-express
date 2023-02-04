import Head from 'next/head'

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
        <form action='/user/signup' method='POST'>
          <div class="container">
            
            <p>Please fill in this form to create an account.</p>
            <hr />

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />

            <label for="repeat"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="repeat" required />
            
            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label>
            
            

            <div class="clearfix">
              <button type="button" class="cancelbtn">Cancel</button>
              <button type="submit" class="signupbtn">Sign Up</button>
            </div>
          </div>
        </form>
      </>
    )
  }