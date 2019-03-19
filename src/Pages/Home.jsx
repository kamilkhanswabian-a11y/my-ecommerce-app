import React from 'react'
import Slider from '../Components/Slider'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
// import FeaturedProducts from '../SmallComponents/FeaturedProducts'
function Home() {
  return (
    <div>
       <Navbar></Navbar>
      <Slider></Slider>
      {/* <FeaturedProducts/> */}
    </div>
  )
}

export default Home