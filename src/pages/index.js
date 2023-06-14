import React, { useState, useEffect } from 'react'
//import home from '@/styles/Home.module.css'
import axios from 'axios'
import { Product, FooterBanner, HeroBanner, Navbar} from '@/components';
//import { client } from 'lib/client';
//import Link from 'next/link';
//import $ from 'jquery'
import { Carousel, getContent, forward, backward} from '@/utilities/utils';
import carStyle from '@/styles/Carousel.module.css'

let timeOut = 5000

export default function Home(){
const [content, setContent] = useState([]);
const [contentLoaded, setContentLoaded] = useState(false);

useEffect(() => {
  (async () => {
    //console.log("USE EFFECT");
    let load = await getContent()
    //console.log("LOAD: ", load);
    setContent(load)
    setContentLoaded(true)
    setInterval(()=>{
      Carousel()
    }, timeOut)

  })();
  
}, []);


//console.log("CONTENT: ", content?.user);
//console.log("TEST");
//console.log(content);
  return (
    <>
    
      <Navbar loggedIn={content?.user?.success}></Navbar>
    
    
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      
      <div className={carStyle.container}>
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

