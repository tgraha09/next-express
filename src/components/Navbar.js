import React, {useEffect, useState } from 'react'
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'
import Image from 'next/image';
import logo from '../../assets/logo.png'
import axios from 'axios';

let ShowLogin = ()=>{
  return<div className={styles['link-wrap']}>
  <Link className={styles['link']} href="/">Home</Link>
  <Link className={styles['link']} href="/login">login</Link>
  
</div>
}
let ShowSignUp = ()=>{
  return<div className={styles['link-wrap']}>
  <Link className={styles['link']} href="/">Home</Link>
  <Link className={styles['link']} href="/signup">Signup</Link>
</div>
}
let ShowLinks = (props)=>{
  //console.log(props);
  if(!props.loggedIn){
    if(props.pathname=='/login'){
      return ShowSignUp()
    }
    if(props.pathname=='/signup'){
      return ShowLogin()
    }
    if(props.pathname=='/'){
      return<div className={styles['link-wrap']}>
      <Link className={styles['link']} href="/login">login</Link>
      <Link className={styles['link']} href="/signup">Signup</Link>
    </div>
    }
  }
  else{
    return<div className={styles['link-wrap']}>
      <Link className={styles['link']} href="#" onClick={signOut}>SignOut</Link>
    </div>
  }
  
  
}

async function signOut(e){
  e.preventDefault()
 // console.log("signOut");
  //window.location.href ='/login'
  try {
    let res = await axios({
      method: 'get',
      url: '/user/signout'
    }).then((response)=>{
      //console.log(response.data);
      window.location.href = response.data.redirect
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
//var pathname
const Navbar = (props) => {
  //console.log(props);
  const [pathname, setPathname] = useState();
  const [pathLoaded, setPathLoaded] = useState(false);
  useEffect(()=>{
    setPathname(window?.location.pathname)
    setPathLoaded(true)
  }, [])
  return (
    <div className={styles['nav-wrap']}>
      <div className={styles['logo-wrap']}>
        <div>
          <Image className={styles['nav-logo']} src={logo} /> 
        </div>
      </div>
      <ShowLinks pathname={pathname} loggedIn={props.loggedIn}></ShowLinks>

    </div>
  )
}

export default Navbar