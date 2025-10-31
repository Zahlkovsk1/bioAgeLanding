import React, { useState, useEffect, useRef } from 'react';

const App: React.FC = () => {

  const SparkleIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
      <path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path>
    </svg>
  );

  const DownloadIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5 mr-2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" x2="12" y1="15" y2="3"></line>
    </svg>
  );

  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  const featureSectionRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    // Header scroll effect
    const header = document.querySelector('.site-header');
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsFeaturesVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (featureSectionRef.current) {
      observer.observe(featureSectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (featureSectionRef.current) {
        observer.unobserve(featureSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        /* 1. Root & Variables */
        :root {
          --color-bg: #ffffff;
          --color-bg-offset: #f5f5f7;
          --color-text-primary: #1d1d1f;
          --color-text-secondary: #6e6e73;
          --color-border: #d2d2d7;
          --color-black: #121212;
          --color-white: #ffffff;
          --color-footer-bg: #121215; /* Darker footer background */
          --color-footer-text: #9ca3af;
          --color-accent-blue: #007aff; 
          --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI",
            Roboto, "Helvetica Neue", Arial, sans-serif;
          --font-rounded: -apple-system, BlinkMacSystemFont, "SF Pro Rounded",
            "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        /* 2. Global Resets & Typography */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: var(--font-sans);
          background-color: var(--color-bg);
          color: var(--color-text-primary);
          -webkit-font-smoothing: antialiased;
          line-height: 1.5;
        }

        /* 3. Layout */
        .container {
          max-width: 980px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 22px;
          padding-right: 22px;
        }

        /* 4. Header & Navigation */
        .site-header {
          position: sticky; top: 0; z-index: 100;
          background-color: var(--color-bg);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          padding: 20px 0;
          transition: box-shadow 0.3s ease;
        }
        .site-header.scrolled {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .nav { display: flex; justify-content: space-between; align-items: center; }
        .brand {
          font-family: var(--font-rounded); font-size: 1.25rem; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
        }
        .brand-icon {
          width: 32px; height: 32px; background-color: var(--color-text-primary);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          color: var(--color-white); font-size: 1.25rem; font-weight: bold;
        }

        /* 5. Buttons */
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; text-decoration: none; font-family: var(--font-rounded);
          font-size: 0.9375rem; font-weight: 500; padding: 10px 20px;
          border-radius: 8px; cursor: pointer; transition: all 0.2s ease-in-out;
          border: 1px solid transparent;
        }
        .btn-dark {
          background-color: var(--color-text-primary); color: var(--color-bg);
          border-color: var(--color-text-primary);
        }
        .btn-dark:hover { opacity: 0.85; }
        .btn-light {
          background-color: var(--color-white); color: var(--color-text-primary);
          border-color: var(--color-white);
        }
        .btn-light:hover { opacity: 0.9; }
        .btn svg { width: 16px; height: 16px; display: block; }

        /* 6. Hero Section */
        .hero { padding-top: 100px; padding-bottom: 100px; }
        .hero-with-phone {
            display: flex; align-items: center; gap: 40px; flex-direction: row;
        }
        .hero-content { flex: 1; }
        @media (min-width: 1025px) {
            .hero-content { margin-top: 40px; }
        }
        .hero h1 {
            font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px;
        }
        .hero p {
            font-size: 1.25rem; color: var(--color-text-secondary);
            margin-bottom: 30px; max-width: 500px;
        }
        .hero-actions { display: flex; gap: 16px; align-items: center; }
        .hero-label {
            display: inline-flex; align-items: center; gap: 6px;
            font-family: var(--font-rounded); font-size: 0.8125rem; font-weight: 600; 
            padding: 4px 12px; margin-bottom: 16px; border-radius: 9999px;
            background-color: var(--color-bg-offset); color: var(--color-text-secondary);
            text-transform: uppercase; letter-spacing: 0.5px;
        }
        .hero-label svg {
            width: 14px; height: 14px; fill: none; 
            stroke: var(--color-text-secondary); 
        }
        .btn-hero-download {
            padding: 18px 32px; font-weight: 700; font-size: 1.25rem; 
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.4); 
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-hero-download:hover {
            box-shadow: 0 10px 20px -8px rgba(75, 85, 99, 0.5); 
            transform: scale(1.05);
        }
        .btn-hero-download svg {
            margin-right: 8px; width: 20px; height: 20px; stroke: white; 
        }

        /* 7. Phone Mockup (Shared) */
        .phone-mockup {
            flex: 1; display: flex; justify-content: center; align-items: center;
            min-width: 300px;
        }
        .iphone-frame {
            width: 300px; height: 600px; background: #111;
            border-radius: 40px; padding: 10px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--color-border);
            position: relative;
        }
        .iphone-screen {
            width: 100%; height: 100%; overflow: hidden;
            border-radius: 30px; position: relative; background-color: white;
        }
        .iphone-screen img {
            width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .dynamic-island {
            position: absolute; top: 10px; left: 50%;
            transform: translateX(-50%); width: 80px; height: 20px;
            background: #111; border-radius: 20px; z-index: 10;
        }

        /* 8. Simple Features Section (Monochrome, Signal, Clarity) */
        .features {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 30px; padding: 60px 0; text-align: center;
        }
        .feature h3 {
          font-family: var(--font-rounded); font-size: 1.5rem;
          font-weight: 600; margin-bottom: 10px;
        }
        .feature p { color: var(--color-text-secondary); font-size: 1rem; }


        /* 9. NEW Feature Cards Section (2-Column Animated)*/
        .feature-cards-section {
          padding: 120px 0;
          background: linear-gradient(to bottom, 
            var(--color-bg) 0%,         
            rgba(0, 0, 0, 0.04) 20%,     /* 4% opacity black/dark gray */
            rgba(0, 0, 0, 0.04) 80%,     /* 4% opacity black/dark gray */
            var(--color-bg) 100%        
          );
          overflow: hidden;
        }
        .features-two-col-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start; 
        }
        .features-content-stack .feature-cards-title,
        .features-content-stack .feature-cards-subtitle {
          text-align: left;
          margin-left: 0;
          margin-right: 0;
        }
        .feature-cards-title {
          font-family: var(--font-rounded);
          font-size: 2.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-bottom: 16px;
          color: var(--color-text-primary);
        }
        .feature-cards-subtitle {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          margin-bottom: 40px; 
          max-width: 700px;
        }
        .feature-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 20px; 
        }
        .feature-card {
          background-color: var(--color-white);
          border-radius: 20px;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          padding: 24px 32px;
          transition: all 0.3s ease-in-out;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          opacity: 0; 
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        }
        .feature-card-icon {
          width: 48px; height: 48px; flex-shrink: 0;
          background-color: #2C2C2E; 
          border-radius: 12px; 
          display: flex; align-items: center; justify-content: center;
        }
        .feature-card-icon svg {
          width: 24px; height: 24px; stroke: var(--color-white);
        }
        .feature-card-content h3 {
          font-family: var(--font-rounded); font-size: 1.25rem;
          font-weight: 600; margin-bottom: 8px;
          color: var(--color-text-primary);
        }
        .feature-card-content p {
          font-size: 0.9375rem; line-height: 1.6;
          color: var(--color-text-secondary);
        }

        /* 10. Dark CTA Band */
        .dark-cta-band-outer { padding: 24px 0; }
        .dark-cta-band {
          background-color: var(--color-black); color: var(--color-white);
          padding: 56px 22px; text-align: center; border-radius: 20px;
          max-width: 980px; margin-left: auto; margin-right: auto;
        }
        .dark-cta-band .hero-label {
          margin: 0 auto 14px; background-color: #333336; color: var(--color-white);
        }
        .dark-cta-band .hero-label svg { fill: var(--color-white); }
        .dark-cta-band h2 {
          font-family: var(--font-rounded); font-size: 3rem; font-weight: 700;
          line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 12px;
          max-width: 30ch; margin-left: auto; margin-right: auto;
        }
        .dark-cta-band p {
          font-size: 1.125rem; color: #d2d2d7;
          max-width: 600px; margin: 0 auto 20px;
        }
        .cta-actions {
          display: flex; justify-content: center; align-items: center;
          gap: 12px; margin-bottom: 12px; flex-wrap: wrap;
        }
        .cta-disclaimer {
          font-size: 0.8125rem; color: #6e6e73; margin-top: 10px;
        }

        /* 11. Footer */
        .site-footer {
          color: var(--color-footer-text);
          background-color: var(--color-footer-bg); /* Solid dark background */
          padding: 100px 0 30px 0; 
        }
        .footer-main {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 80px; margin-bottom: 50px; padding-bottom: 50px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-brand { flex: 1; max-width: 400px; }
        .footer-brand .brand { color: var(--color-white); margin-bottom: 16px; }
        .footer-brand-desc {
          font-size: 0.9375rem; line-height: 1.6;
          color: var(--color-footer-text); margin-bottom: 20px;
        }
        .footer-social { display: flex; gap: 12px; }
        .social-icon {
          width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.08);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          color: var(--color-white); text-decoration: none; transition: all 0.2s ease-in-out;
        }
        .social-icon:hover {
          background-color: rgba(255, 255, 255, 0.15); transform: translateY(-2px);
        }
        .social-icon svg { width: 18px; height: 18px; }
        .footer-contact-section { flex: 0 0 300px; }
        .footer-contact-section h3 {
          font-family: var(--font-rounded); font-size: 1rem; font-weight: 600;
          color: var(--color-white); margin-bottom: 20px;
        }
        .footer-contact { display: flex; flex-direction: column; gap: 16px; }
        .contact-item {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 0.9375rem; line-height: 1.6;
        }
        .contact-item svg {
          width: 18px; height: 18px; margin-top: 2px;
          flex-shrink: 0; stroke: var(--color-footer-text);
        }
        .contact-item a {
          color: var(--color-footer-text); text-decoration: none; transition: color 0.2s ease-in-out;
        }
        .contact-item a:hover { color: var(--color-white); }
        .contact-item span { color: var(--color-footer-text); }
        .footer-bottom {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.875rem; color: var(--color-footer-text);
        }
        .footer-legal { display: flex; gap: 24px; }
        .footer-legal a {
          color: var(--color-footer-text); text-decoration: none; transition: color 0.2s ease-in-out;
        }
        .footer-legal a:hover { color: var(--color-white); }


        /* 12. === Animation Keyframes === */
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Animation Utility Classes */
        .phone-mockup-features.animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        .feature-card.animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        /* Hide phone mockup by default for animation */
        .phone-mockup-features {
          opacity: 0;
        }


        /* 13. Responsive */
        @media (max-width: 768px) {
          .hero { padding: 60px 0; }
          .hero-with-phone { flex-direction: column; gap: 40px; }
          .hero-with-phone .hero-label,
          .hero-with-phone h1,
          .hero-with-phone p { text-align: center; }
          .hero-with-phone .hero-actions { justify-content: center; }
          .phone-mockup { max-width: 280px; order: -1; }
          .hero h1 { font-size: 2.5rem; }
          .hero p { font-size: 1.125rem; }
          .features { grid-template-columns: 1fr; gap: 40px; }
          .dark-cta-band { padding: 36px 22px; border-radius: 0; margin: 0; }
          .dark-cta-band-outer { padding: 12px 0; }
          .dark-cta-band h2 { font-size: 2.25rem; max-width: 22ch; }
          .dark-cta-band p { margin-bottom: 16px; }
          .cta-actions { flex-direction: column; align-items: center; }
          .cta-actions a { width: 100%; max-width: 320px; }
          .cta-disclaimer { font-size: 0.8125rem; color: #6e6e73; margin-top: 10px; }

          /* Responsive for new 2-col features */
          .features-two-col-layout {
            grid-template-columns: 1fr; /* Stack columns on mobile */
          }
          .phone-mockup-features {
            max-width: 280px;
            margin: 0 auto 40px auto; /* Center mockup */
          }
          .features-content-stack .feature-cards-title,
          .features-content-stack .feature-cards-subtitle {
            text-align: center; /* Center text on mobile */
          }
          .feature-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 24px;
          }
          .feature-cards-section { padding: 60px 0; }
          .feature-cards-title { font-size: 2rem; }
          .feature-cards-subtitle { font-size: 1rem; margin-bottom: 40px; }
        }
      `}</style>

      <header className="site-header">
        <div className="nav-container">
          <nav className="nav" aria-label="Main Navigation">
            <div className="brand">
              <div className="brand-icon"></div>
              BioAge
            </div>
            <a className="btn btn-dark" href="#download">Download Now</a>
          </nav>
        </div>
      </header>

      <main>
        {/*HERO SECTION*/}
        <section className="hero container">
          <div className="hero-with-phone">
            <div className="hero-content">
              <div className="hero-label">
                {SparkleIcon}
                AI-Powered Nutrition Tracking
              </div>
              <h1>
                Track Your
                <br />
                Health Journey
              </h1>
              <p>Log meals, track calories, analyze nutrition with AI, and monitor your activities. Everything you need to achieve your health goals in one beautiful app.</p>
              <div className="hero-actions">
                <a className="btn btn-dark btn-hero-download" href="#download">
                  {DownloadIcon}
                  Download for iOS
                </a>
              </div>
            </div>
            <div className="phone-mockup">
              <div className="iphone-frame">
                <div className="iphone-screen">
                  <div className="dynamic-island"></div>
                  <img
                    alt="BioAge App Screenshot"
                    src="https://i.postimg.cc/Ls2jvZH0/Screenshot-2025-10-30-at-21-29-30.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === SIMPLE FEATURES SECTION === */}
        <section id="learn" className="features container">
          <div className="feature">
            <h3>Monochrome focus</h3>
            <p>Black and white UI that puts outcomes first.</p>
          </div>
          <div className="feature">
            <h3>Signal over noise</h3>
            <p>Only the metrics that matter to your decisions.</p>
          </div>
          <div className="feature">
            <h3>Built for clarity</h3>
            <p>Accessible type, generous spacing, no distractions.</p>
          </div>
        </section>

        {/* === NEW ANIMATED FEATURES SECTION === */}
        <section ref={featureSectionRef} className="feature-cards-section">
          <div className="container">
            <div className="features-two-col-layout">
              {/* Left Column: New Mockup */}
              <div className={`phone-mockup phone-mockup-features ${isFeaturesVisible ? 'animate-fade-in-left' : ''}`}>
                <div className="iphone-frame">
                  <div className="iphone-screen">
                    <div className="dynamic-island"></div>
                    <img
                      alt="BioAge App Features"
                      src="https://images.unsplash.com/photo-1580600309338-7516e0b3c2f5?w=300&h=600&fit=crop"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/280x580/f5f5f7/6e6e73?text=App+Feature')}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Content & Card Stack */}
              <div className="features-content-stack">
                <h2 className="feature-cards-title">Everything You Need In One App</h2>
                <p className="feature-cards-subtitle">Powerful features designed to help you achieve your health and fitness goals with precision.</p>

                <div className="feature-cards-stack">
                  {/* Card 1 */}
                  <div className={`feature-card ${isFeaturesVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
                    <div className="feature-card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <div className="feature-card-content">
                      <h3>AI Nutrition Analysis</h3>
                      <p>Snap a photo and let our AI instantly analyze calories, macros, and nutrients with incredible accuracy.</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className={`feature-card ${isFeaturesVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.4s' }}>
                    <div className="feature-card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                        <path d="M7 2v20" />
                        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                      </svg>
                    </div>
                    <div className="feature-card-content">
                      <h3>Smart Meal Logging</h3>
                      <p>Log meals effortlessly. Track everything you eat with detailed nutritional breakdowns and daily insights.</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className={`feature-card ${isFeaturesVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.6s' }}>
                    <div className="feature-card-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <div className="feature-card-content">
                      <h3>Activity Tracking</h3>
                      <p>Monitor your daily activities, workouts, and calories burned to get a complete picture of your health.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*DARK CTA SECTION*/}
        <section id="download" className="dark-cta-band-outer">
          <div className="dark-cta-band container">
            <div className="hero-label">
              {SparkleIcon}
              Start Your Health Journey Today
            </div>
            <h2>Ready to Transform Your Life?</h2>
            <p>Join thousands of users who are already achieving their health goals with BioAge. Download now and start tracking your nutrition with AI!</p>
            <div className="cta-actions">
              <a className="btn btn-light" href="#">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download for iOS
              </a>
              <a className="btn btn-dark" href="#">
                Get Started
              </a>
            </div>
            <p className="cta-disclaimer">Free 5-day trial • Cancel anytime</p>
          </div>
        </section>
      </main>

      {/* === FOOTER === */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="brand">
                <div className="brand-icon">🍎</div>
                BioAge
              </div>
              <p className="footer-brand-desc">
                AI-powered nutrition tracking and activity logging for a healthier you.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-contact-section">
              <h3>Contact</h3>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:support@bioage.com">support@bioage.com</a>
                </div>
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>123 Health Street<br />San Francisco, CA 94102</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 BioAge. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
