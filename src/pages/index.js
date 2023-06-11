import React, { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { Product, FooterBanner, HeroBanner} from '@/components';
import { client } from 'lib/client';
import Link from 'next/link';
import $ from 'jquery'
import { Carousel, getContent, forward, backward} from '@/utilities/utils';


let mounted = false;
let scrollCount=0
let width = 0
let timeOut = 4000
let isEnded = false;
//https://stackoverflow.com/questions/54936559/using-async-await-in-react-component


export default function Home(){

const [content, setContent] = useState([]);

const [contentLoaded, setContentLoaded] = useState(false);

let rendered = false
let interval 
useEffect(() => {
  (async () => {
    
    let load = await getContent()
    setContent(load)
    setContentLoaded(true)
    if(window.location.pathname != "/"){
      clearInterval(interval)
      console.log("CLEAR");
    }
    else {
      
      interval = setInterval(()=>{
        Carousel()
      }, timeOut)

    }

  })();

}, []);

  return (
    <>
    
    <Link className='link' href="/login">login</Link>
    <Link className='link' href="/signup">Signup</Link>
    
    
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      <div className='container'>
        <div className="prev" onClick={backward}>
          <a>
          ❮
          </a>
        </div>
        <div id='car-wrap' >
        {content?.featured?.result?.map(
          (product, idx) => 
          <Product key={`product-${idx}`} product={product} index={idx} />
        )}
        </div>
        <div className="next" onClick={forward}>
          <a >
          ❯
          </a>
          </div>
      </div>
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <h1 id='target'>{content?.user?.email}</h1>
      <FooterBanner></FooterBanner>
      
    </>
  )
}



//<HeroBanner heroBanner={banner.length && banner[0]}></HeroBanner>



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

