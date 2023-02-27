import React from 'react'
import Link from 'next/link'
import { urlFor } from 'lib/client'

const Product = (props) => {
  //console.log(props);
  //${slug.current}image && 
  //{product: {image, name, slug, price, _id, index}}
  const {image, name, slug, price, _id, index} = props.product
  if(image == undefined){
    //console.log('NULL');
    //console.log(image);
    return
  }
 // console.log(props);
 // console.log(props.index);

  return (
    <>
      <Link id={`product-${props.index}`} className='product-link' href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img src={urlFor(image[0]).url()}
          width={250}
          height={250}
          className="product-image" />
          <p className='product-name'>{name}</p>
          <p className='product-price'>{price}</p>
        </div>
      </Link>
    </>
  )
}

export default Product