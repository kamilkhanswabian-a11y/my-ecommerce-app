import React from 'react'
import Slider from '../Components/Slider'
import Navbar from '../Components/Navbar'
import LogoMarquee from '../Components/Logo_Marquee'
import FeaturedProducts from '../SmallComponents/FeaturedProducts'
import Review from '../SmallComponents/Review'
import Footer from '../Components/Footer'
function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Slider></Slider>
      <LogoMarquee></LogoMarquee>
      <FeaturedProducts/>
      <Review></Review>
      <Footer/>
    </div>
  )
}

export default Home