import React from "react";
import Carousel from 'react-bootstrap/Carousel'; 
import slide1 from './pics/c1.png';
import ShoppingAssistant from "./ShoppingAssistant";
import VirtualTryOn from "./VirtualTryOn";

const Home = ({ addToCart }) => {
    const slides = [
        {
            id: 1,
            title: "Modern Classics",
            subtitle: "Summer Collection 2023",
            description: "Timeless designs reimagined for the contemporary wardrobe.",
            cta: "Shop Collection",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            textColor: "text-white",
            ctaColor: "bg-white text-black hover:bg-gray-100"
        },
        {
            id: 2,
            title: "Seasonal Essentials",
            subtitle: "Autumn/Winter 2023",
            description: "Luxurious fabrics and refined silhouettes for the colder months.",
            cta: "Discover More",
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            textColor: "text-white",
            ctaColor: "bg-white text-black hover:bg-gray-100"
        },
        {
            id: 3,
            title: "Exclusive Designs",
            subtitle: "Limited Edition Collection",
            description: "Unique pieces crafted from the finest materials with expert attention to detail.",
            cta: "View Collection",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2020&q=80",
            textColor: "text-black",
            ctaColor: "bg-black text-white hover:bg-gray-900"
        }
    ];

    return (
        <div className="home-page">
            {/* Carousel Section */}
            <Carousel className="carousel-container">
            <Carousel.Item>
                    <img className="d-block w-100" src={slide1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'} alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'} alt="Third slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'} alt="Fourth slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'} alt="Fifth slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={ "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"} alt="sixth slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"} alt="seven slide" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2020&q=80"} alt="Eight slide" />
                </Carousel.Item>
            </Carousel>
            <VirtualTryOn/>
          <ShoppingAssistant/>
        </div>
    );
};

export default Home;
