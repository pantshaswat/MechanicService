import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureSection from "./FeatureSection";


export default function HomePage(){

    return(
        <>
        <div>
                <Navbar />
                <Hero />
                <FeatureSection/>
                <Footer/>
        </div>
       
        </>
    );
}

