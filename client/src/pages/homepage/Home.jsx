import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import Slick Carousel
import interview from "../../assets/main.gif";
import feature1 from "../../assets/feature1.png";
import feature2 from "../../assets/feature2.jpeg";
import feature3 from "../../assets/feature3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/home.css"; // Import external CSS

const Home = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-image">
          <img src={interview} alt="Interview Preparation" />
        </div>
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">Prepify</span></h1>
          <p>Ace Your Next Interview with Confidence – Learn, Practice, Succeed!</p>
          <Link to="/record">
            <button className="get-started-btn">Record a Mock Interview</button>
          </Link>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="carousel-section">
        <div className="carousel-container">
          <Slider {...carouselSettings}>
            {["Amazon", "Google", "Juspay", "Flipkart", "Samsung", "Zoom", "Fico", "Paypal"].map((company, index) => (
              <div key={index} className="carousel-item">
                <h3>{company}</h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>About Prepify</h2>
          <p>
            Prepify is your go-to platform for preparing for interviews. Whether you're a beginner or an experienced professional, we offer tools, resources, and mock interviews to help you excel.
          </p>
          <Link to="/about" className="learn-more">Learn more about us</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Prepify?</h2>
        <div className="features-container">
          {[feature1, feature2, feature3].map((feature, index) => (
            <div key={index} className="feature-item">
              <img src={feature} alt={`Feature ${index + 1}`} />
              <div>
                <h3>{index === 0 ? "Interactive Mock Interviews" : index === 1 ? "Expert Resources" : "Track Your Progress"}</h3>
                <p>{index === 0 ? "Practice interviews in a real-time simulated environment and get instant feedback." : index === 1 ? "Access to expert-written guides, tips, and study materials to help you prepare effectively." : "Keep track of your interview preparation journey and improve over time."}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>Have questions or need assistance? Our team is here to help. Get in touch with us!</p>
          <Link to="/contact" className="contact-link">Contact Support</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
