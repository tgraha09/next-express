import axios from 'axios'

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

async function getUser(){
    //console.log('getUser');
    try {
      let res = await axios({
        method: 'get',
        url: '/current',
        
      }).then((response)=>{
        //console.log(response);
  
        return response
        //window.location.href = response.data
      })
      return res
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


export {
    getProducts,
    getFeatured,
    getUser,
    getBanner,
}