import Footer from "../Components/Footer";
import GroomerCTA from "../Components/GroomerCTA";
import GroomingCategory from "../Components/GroomingCategory";
import HomePageHeroSection from "../Components/HomePageHeroSection";
import Navbar from "../Components/NavBar";
import TestimonialVideos from "../Components/TestimonialVideos";
import WhyChooseUs from "../Components/WhyChooseUs";
import Home from "./Home";

function HomePage(){
    return (
        // navbar
        <>
        <Navbar/>
        <HomePageHeroSection/>
        <GroomingCategory/>
        <WhyChooseUs/>
        <TestimonialVideos/>
        <GroomerCTA/>
        

        <Footer/>
        </>
    )
}

export default HomePage