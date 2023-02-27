import React, { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { Product, FooterBanner, HeroBanner} from '@/components';
import { client } from 'lib/client';
import Link from 'next/link';
import $ from 'jquery'

//import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'
//import "glidejs/glide/src/assets/sass/glide.core";
//import "glidejs/glide/src/assets/sass/glide.theme";

//const inter = Inter({ subsets: ['latin'] })
let mounted = false;

let isEnded = false;
//https://stackoverflow.com/questions/54936559/using-async-await-in-react-component


export default function Home(){
//const [token, setToken] = useState(null);
const [user, setUser] = useState([]);
const [banner, setBanner] = useState([]);
const [products, setProducts] = useState([]);
const [featured, setFeatured] = useState([]);

const [userLoaded, setUserLoaded] = useState(false);
const [bannerLoaded, setBannerLoaded] = useState(false);
const [productsLoaded, setProductsLoaded] = useState(false);
const [featuredLoaded, setFeaturedLoaded] = useState(false);


//console.log();
//let res = fetchBanner();


useEffect(() => {
  (async () => {
    
    //initCarousel()
    //console.log(window);
    //document.getElementById("car-wrap").dispatchEvent(new Event('scroll'));
    //.scrollLeft += 250;
    //new Glide('.glide').mount()
    /*window.onload = ()=>{
      const element = document.getElementById("car-wrap");
      console.log(element);
      element.scrollLeft = 250;
      console.log(element.scrollLeft);
    }*/
    
    
    //element.scrollTop = 10;

    /*$(document).on(function (){
      //$("#product-1").on
      setInterval(()=>{
        var pos = $('#car-wrap').scrollLeft();
        $("#car-wrap").animate({scrollLeft: pos + 300}, 800);
      }, 1000);
      /*$("#car-wrap").animate({
        scrollLeft: $("#product-1").offset().left - 250
      }, 800);*/
    //});
    setUserLoaded(false);
    let resUser = await getUser() //fetchBanner();
    if (resUser.data) {
      //console.log(resUser.data);
      setUser(resUser.data);
      setUserLoaded(true);
    }
    //setUserLoaded(false);

    setBannerLoaded(false);
    let resBanner = await getBanner() //fetchBanner();
    if (resBanner.data) {
      //console.log(resBanner.data);
      setBanner(resBanner.data.result);
      setBannerLoaded(true);
    }

    setFeaturedLoaded(false);
    let resFeatured = await getFeatured()//fetchBanner();
    if (resFeatured.data) {
      //console.log(resProducts.data.result.length);
      
      setFeatured(resFeatured.data);
      setFeaturedLoaded(true);
    }

    //setBannerLoaded(false);
    setProductsLoaded(false);
    let resProducts = await getProducts()//fetchBanner();
    if (resProducts.data) {
      //console.log(resProducts.data.result.length);
      setInterval(()=>{
        var el = document.querySelector("#car-wrap");
        Carousel(el, resProducts.data.result.length)
        
        
      }, timeOut);
      setProducts(resProducts.data);
      setProductsLoaded(true);
    }
    //setProductsLoaded(false);

    
  })();
}, []);

  //console.log(featured);

  //console.log(products);
  return (
    <>
    
    <Link className='link' href="/login">login</Link>
    <Link className='link' href="/signup">Signup</Link>
    
    
       <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      <div className='container'>
        <div id='car-wrap' >
        {featured.result?.map(
          
            (product, idx) => 
            <Product key={`product-${idx}`} product={product} index={idx} />
        )}
        </div>
      </div>
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      

      
      <h1 id='target'>{user.email}</h1>
      <FooterBanner></FooterBanner>
      
    </>
  )
}

//<HeroBanner heroBanner={banner.length && banner[0]}></HeroBanner>
let scrollCount=0
let width = 0
let timeOut = 8000
function Carousel(el, length){
  let firstChild = el.firstChild
  let childWidth = firstChild.getBoundingClientRect().width
  //document.body.getbo
  //console.log(childWidth, (childWidth*(length-1)));
  //let element = e.target
  //console.log("TEST", $(element));
  
  //el.scro
  //console.log(length);

  
  
  if(el.scrollLeft == childWidth*(length-1)){
    //console.log("END");
    isEnded=true
    //console.log(isEnded);
    el.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    //timeOut=1000
    /*setTimeout(function() {
      console.log(el.scrollLeft);
    }, 1000);*/
    
    scrollCount=-1
    
  }

  if(el.scrollLeft==0 && isEnded==true){
    setTimeout(() => {
      isEnded=false
    }, 1000);
    el.scrollTo({
      top: 0,
      left: el.scrollLeft + childWidth,
      behavior: 'smooth',
    });
  }
  
  if(isEnded==false){
    el.scrollTo({
      top: 0,
      left: el.scrollLeft + childWidth,
      behavior: 'smooth',
    });
  }
  scrollCount++
}

/*<div className='products-container'>
        {products.result?.map(
          (product, idx) => 
          <Product key={`product${idx}`}
            product={product} />
          )}
      </div>*/

/*<div className='products-container'>
        {products.result?.map(
          (product, idx) => 
          <Product key={`product${idx}`}
            product={product} />
          )}
      </div>*/

async function getFeatured(){
  try {
    let res = await axios({
      method: 'get',
      url: 'https://9z1x9qfr.api.sanity.io/v2023-02-05/data/query/production?query=*[_type == "carousel"]',
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
      },
  
    }).then((response)=>{

      return response
    })
    //console.log(res);
    return res

  } catch (error) {

    return error.response;
  }
}

async function getProducts(){
  try {
    let res = await axios({
      method: 'get',
      url: 'https://9z1x9qfr.api.sanity.io/v2023-02-05/data/query/production?query=*[_type == "product"]',
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
      },
  
    }).then((response)=>{

      return response
    })
    //console.log(res);
    return res

  } catch (error) {

    return error.response;
  }
}

async function getUser(){
  //console.log('getUser');
  try {
    let res = await axios({
      method: 'get',
      url: '/current',
      
    }).then((response)=>{

      return response
      //window.location.href = response.data
    })
    return res
    //console.log(res);
    //let data = await res.data;
    //console.log(data);
  } catch (error) {
    //console.log(error.response.data); // this is the main part. Use the response property from the error object

    return error.response;
  }
}
//[_type == "product"]
async function getBanner(){
  try {
    let res = await axios({
      method: 'get',
      url: 'https://9z1x9qfr.api.sanity.io/v2023-02-05/data/query/production?query=*[_type == "banner"]',
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
      },
  
    }).then((response)=>{

      return response
    })
    //console.log(res);
    return res
 
  } catch (error) {

    return error.response;
  }
}


function initCarousel(){
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel__item");
    const buttonsHtml = Array.from(items, () => {
      return `<span className="carousel__button"></span>`;
    });
  
    carousel.insertAdjacentHTML(
      "beforeend",
      `
      <div className="carousel__nav">
        ${buttonsHtml.join("")}
      </div>
    `
    );
  
    const buttons = carousel.querySelectorAll(".carousel__button");
    //items[0].classList.add("carousel__item--selected");
    //buttons[0].classList.add("carousel__button--selected");
    buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
        // un-select all the items
        items.forEach((item) =>
          item.classList.remove("carousel__item--selected")
        );
        buttons.forEach((button) =>
          button.classList.remove("carousel__button--selected")
        );
  
        items[i].classList.add("carousel__item--selected");
        button.classList.add("carousel__button--selected");
      });
    });
  
    // Select the first item on page load
    //items[0].classList.add("carousel__item--selected");
    //buttons[0].classList.add("carousel__button--selected");
  });
  
}