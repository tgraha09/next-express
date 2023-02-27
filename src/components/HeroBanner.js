import React from 'react'
import Link from 'next/link'
import { urlFor } from 'lib/client';
import styles from '../styles/Banner.module.css'
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm'

/*export default class HeroBanner extends React.Component{
    constructor(props){
        super()
        this.banner = props
        console.log(this.banner);
    }

    componentDidMount() {
        
        //console.log(this.banner);
        
    }

    render(){
        return<>
        <div>HeroBanner</div>
        <div className='hero-banner-container'>
            <div>
                
                

                <div>
                    <Link href="/product/ID">
                        <button type='button'>Button Text</button>
                    </Link>
                    <div className='desc'>
                        <h5>Description</h5>
                    </div>
                </div>
            </div>
        </div>
    </>
    }
}*/

/*<p className='beats-solo'>{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <img src={urlFor(heroBanner.image)} alt='headphones'
                className='hero-banner-image'/>*/

const HeroBanner = ({heroBanner}) => {
    //console.log(heroBanner);
    if(heroBanner == undefined || heroBanner == 0){

        return heroBanner
    }
    else{
        //console.log("PROP", heroBanner.image);
        //console.log(heroBanner);
    }
   
    return (
    <>
        
        <div className={styles.heroBannerWrap}>
            
            <div className={styles.textBannerWrap}>
                <p className='textBanner'>{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <Link href="/product/ID">
                    <button className='bttn' type='button'>Button Text</button>
                </Link>
            </div>
            
            <div className={styles.heroBannerImage}>
                <img src={urlFor(heroBanner.image).url()} alt='headphones' />
            </div>
            
            
        </div>

        
    </>
  )
}

/*<div>
            
            <div className='desc'>
                <h5>Description</h5>
            </div>
        </div>*/

export default HeroBanner