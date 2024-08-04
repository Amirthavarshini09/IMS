import React, { useState, useEffect } from "react";
import { FaSimCard, FaMobileAlt, FaNetworkWired } from "react-icons/fa";
import "./Home.css";
import { Link } from 'react-router-dom';

function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const features = [
    { icon: <FaSimCard />, title: "SIM Card Management", description: "Reserve and manage SIM cards efficiently, ensuring proper tracking and assignment." },
    { icon: <FaMobileAlt />, title: "IMEI Association", description: "Associate SIM cards with IMEI numbers to ensure accurate device tracking." },
    { icon: <FaNetworkWired />, title: "MSISDN Tracking", description: "Track MSISDN numbers for better subscriber management and service delivery." }
  ];

  const handleCardClick = (index) => {
    setActiveIndex(prevIndex => prevIndex === index ? null : index);
  };



  return (
    <div className="scroll-container">
      <section id="home">
        <div className="content-wrapper">
          <h1 className="hero-title">Inventory Management System</h1>
          <p className="hero-description">
            IMS is a comprehensive system designed to manage SIM card reservations and associations with IMEI and MSISDN.
          </p>
        </div>
      </section>

      <section id="features">
        <div className="content-wrapper">
          <h2 className="section-title1">Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <div className={`feature-description ${activeIndex === index ? 'active' : ''}`}>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started">
        <div className="content-wrapper">
          <h2>Ready to Begin?</h2>
          <p>Start managing your inventory efficiently today.</p>
          <Link to="/Login" className="primary-button">Get Started</Link>
        </div>
      </section>
    </div>
  );
}
export default Home;