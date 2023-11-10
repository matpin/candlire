import React from 'react';
// import homepageImage from "../../src/homepageImage.jpg";
import ProductsList from './ProductsList';

function Homepage({ productsArray }) {
  return (
    <div>
        {/* <img className="image2" src={homepageImage} alt="homepageImage" /> */}
        <ProductsList productsArray={productsArray} />
    </div>
    
  )
}

export default Homepage;