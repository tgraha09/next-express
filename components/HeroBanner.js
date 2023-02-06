import React from 'react'
import Link from 'next/link'
const HeroBanner = () => {
  return (
    <>
        <div>HeroBanner</div>
        <div className='hero-banner-container'>
            <div>
                <p className='beats-solo'>SMALL TEXT</p>
                <img src='' alt='headphones'
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