import React from 'react'
import Link from 'next/link'
import { urlFor } from 'lib/client';


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
    
    if(heroBanner.image == undefined){
        
        //this.forceUpdate()
        /*<img src={urlFor(heroBanner.image).url()} alt='headphones'
                className='hero-banner-image'/>*/

        return heroBanner
    }
    else{
        //console.log("PROP", heroBanner.image);
    }
   
    return (
    <>
        <div>HeroBanner</div>
        <div className='hero-banner-container'>
            <div>
                <p className='beats-solo'>{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                
                <img src={urlFor(heroBanner.image).url()} alt='headphones'
                className='hero-banner-image'/>
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
  )
}

export default HeroBanner