import React from 'react';
import Banner from './Banner';
import Products from '../Product/Products';
import Services from './services/Services';
import Category from '../category/Category';
import Airbuds from '../Product/airbud/Airbuds';
import WatchScreen from './screen/WatchScreen';
import Headphones from '../Product/headphone/Headphones';
import Smartwatches from '../Product/smartwatch/Smartwatches';



const Home = () => {
    return (
        <div>

            <Banner></Banner>
            {/* <Category></Category> */}
            <Products></Products>
            {/* <WatchScreen></WatchScreen> */}
            <Airbuds></Airbuds>
            <Smartwatches></Smartwatches>
            <Headphones></Headphones>
            <Services></Services>
       
            
        </div>
    );
};

export default Home;