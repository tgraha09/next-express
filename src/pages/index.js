import React, { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { Product, FooterBanner, HeroBanner} from 'components';
import { client } from 'lib/client';


//const inter = Inter({ subsets: ['latin'] })
let mounted = false;
//https://stackoverflow.com/questions/54936559/using-async-await-in-react-component


export default function Home(){
//const [token, setToken] = useState(null);
  
const [banner, setBanner] = useState([]);
const [products, setProducts] = useState([]);
const [user, setUser] = useState([]);
const [bannerLoaded, setBannerLoaded] = useState(false);
const [productsLoaded, setProductsLoaded] = useState(false);
const [userLoaded, setUserLoaded] = useState(false);
//let res = fetchBanner();
useEffect(() => {
  (async () => {
    setBannerLoaded(false);
    let resBanner = await getBanner() //fetchBanner();
    //console.log(res.data);
    if (resBanner.data) {
      console.log(resBanner.data);
      setBanner(resBanner.data.result);
      setBannerLoaded(true);
    }
    setBannerLoaded(false);

    let resUser = await getUser() //fetchBanner();
    //console.log(resUser);
    if (resUser.data) {
      console.log(resUser.data);
      setUser(resUser.data);
      setUserLoaded(true);
    }
    setUserLoaded(false);
  })();
}, []);

//console.log(banner);
  return (
    <>
      
      <HeroBanner heroBanner={banner.length && banner[0]}></HeroBanner>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {['Product 1', 'Product 2'].map(
          (product)=> product)}
      </div>
      <h1 id='target'>{user.email}</h1>
      <FooterBanner></FooterBanner>
      
    </>
  )
}

async function fetchBanner(){
  console.log('fetchBanner');
  try {
    let response = await fetch('https://9z1x9qfr.api.sanity.io/v2023-02-05/data/query/production?query=*[_type == "banner"]');
    let json = await response.json();
    return { success: true, data: json };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

async function getUser(){
  console.log('getUser');
  try {
    let res = await axios({
      method: 'get',
      url: '/current',
      
    }).then((response)=>{
      //console.log('RESPONSE');
      //console.log(response);
      //let target = document.getElementById("target")
      //console.log(target);
      //target.innerText = response.data.email
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
      //console.log('RESPONSE');
      //console.log(response.data);
      //let target = document.getElementById("target")
      //console.log(target);
      //target.innerText = response.data.email
      return response
      //window.location.href = response.data
    })
    //console.log(res);
    return res
    //let data = await res.data;
    //console.log(data);
  } catch (error) {
    //console.log(error.response.data); // this is the main part. Use the response property from the error object

    return error.response;
  }
}


/*<Head>
        
        <meta name="description" content="Next-Express-App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>*/