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


  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const featureSectionRef = useRef<HTMLElement>(null);
  const detailSectionRefs = useRef<(HTMLElement | null)[]>([]);

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
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (featureSectionRef.current) {
      observer.observe(featureSectionRef.current);
    }

    // Observer for detailed feature sections
    const detailObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleSections(prev => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );

    detailSectionRefs.current.forEach((ref) => {
      if (ref) detailObserver.observe(ref);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (featureSectionRef.current) {
        observer.unobserve(featureSectionRef.current);
      }
      detailSectionRefs.current.forEach((ref) => {
        if (ref) detailObserver.unobserve(ref);
      });
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
          --color-footer-bg: #121215;
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

        /* 9. NEW: Detailed Feature Sections with Alternating Layout */
        .detailed-features-wrapper {
          background: linear-gradient(to bottom, 
            var(--color-bg) 0%,         
            rgba(0, 0, 0, 0.02) 50%,
            var(--color-bg) 100%        
          );
          padding: 80px 0;
        }
        .detailed-feature-section {
          padding: 80px 0;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .detailed-feature-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .detailed-feature-layout {
          display: flex;
          align-items: center;
          gap: 60px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .detailed-feature-layout.reverse {
          flex-direction: row-reverse;
        }
        .detailed-feature-content {
          flex: 1;
          max-width: 500px;
        }
        .detailed-feature-content h2 {
          font-family: var(--font-rounded);
          font-size: 2.75rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          margin-top: 0; 
        }
        .detailed-feature-content p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: 16px;
        }
        .detailed-feature-list {
          list-style: none;
          margin-top: 24px;
        }
        .detailed-feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }
        .detailed-feature-list li svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
          stroke: var(--color-text-primary);
        }
        .detailed-feature-mockup {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s;
        }
        .detailed-feature-section.visible .detailed-feature-mockup {
          opacity: 1;
          transform: scale(1);
        }

        /* 10. Feature Cards Section (2-Column Animated)*/
        .feature-cards-section {
          padding: 120px 0;
          background: linear-gradient(to bottom, 
            var(--color-bg) 0%,         
            rgba(0, 0, 0, 0.04) 20%,
            rgba(0, 0, 0, 0.04) 80%,
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

        /* 11. Dark CTA Band */
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

        /* 12. Footer */
        .site-footer {
          color: var(--color-footer-text);
          background-color: var(--color-footer-bg);
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

        /* 13. Animation Keyframes */
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .phone-mockup-features.animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        .feature-card.animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .phone-mockup-features {
          opacity: 0;
        }

        /* 14. Responsive */
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
          
          /* Detailed features responsive */
          .detailed-feature-layout,
          .detailed-feature-layout.reverse {
            flex-direction: column;
            gap: 40px;
          }
          .detailed-feature-content {
            max-width: 100%;
            text-align: center;
          }
          .detailed-feature-content h2 {
            font-size: 2rem;
          }
          .detailed-feature-mockup {
            max-width: 280px;
          }
          .detailed-features-wrapper {
            padding: 40px 0;
          }
          .detailed-feature-section {
            padding: 40px 0;
          }
          
          .dark-cta-band { padding: 36px 22px; border-radius: 0; margin: 0; }
          .dark-cta-band-outer { padding: 12px 0; }
          .dark-cta-band h2 { font-size: 2.25rem; max-width: 22ch; }
          .dark-cta-band p { margin-bottom: 16px; }
          .cta-actions { flex-direction: column; align-items: center; }
          .cta-actions a { width: 100%; max-width: 320px; }
          .cta-disclaimer { font-size: 0.8125rem; color: #6e6e73; margin-top: 10px; }

          .features-two-col-layout {
            grid-template-columns: 1fr;
          }
          .phone-mockup-features {
            max-width: 280px;
            margin: 0 auto 40px auto;
          }
          .features-content-stack .feature-cards-title,
          .features-content-stack .feature-cards-subtitle {
            text-align: center;
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

        {/* DETAILED FEATURE SECTIONS */}
        <div className="detailed-features-wrapper">
          {/* Feature 1: Goal-driven tracking */}
          <section
            ref={(el) => { detailSectionRefs.current[0] = el; }}
            data-index="0"
            className={`detailed-feature-section ${visibleSections.has(0) ? 'visible' : ''}`}
          >
            <div className="detailed-feature-layout">
              <div className="detailed-feature-mockup">
                <div className="iphone-frame">
                  <div className="iphone-screen">
                    <div className="dynamic-island"></div>
                    <img
                      alt="Goal tracking in BioAge"
                      src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=600&fit=crop"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/280x580/f5f5f7/6e6e73?text=Goals')}
                    />
                  </div>
                </div>
              </div>
              <div className="detailed-feature-content">
                <h2>Goal-Driven Tracking</h2>
                <p>Set personalized nutrition and calorie targets that align with your health journey. Track your progress effortlessly as you work towards your goals.</p>
                <ul className="detailed-feature-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Customize daily calorie and macro targets
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Track activity and calories burned
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Visual progress indicators and insights
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Feature 2: Signal over noise */}
          <section
            ref={(el) => { detailSectionRefs.current[1] = el; }}
            data-index="1"
            className={`detailed-feature-section ${visibleSections.has(1) ? 'visible' : ''}`}
          >
            <div className="detailed-feature-layout reverse">
              <div className="detailed-feature-mockup">
                <div className="iphone-frame">
                  <div className="iphone-screen">
                    <div className="dynamic-island"></div>
                    <img
                      alt="Clean interface in BioAge"
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=600&fit=crop"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/280x580/f5f5f7/6e6e73?text=Clarity')}
                    />
                  </div>
                </div>
              </div>
              <div className="detailed-feature-content">
                <h2>Signal Over Noise</h2>
                <p>Focus on what truly matters. Our minimalist design surfaces only the metrics that drive meaningful decisions about your health.</p>
                <ul className="detailed-feature-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Clean, distraction-free interface
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Essential metrics at a glance
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Actionable insights, not clutter
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Feature 3: AI-powered nutrition */}
          <section
            ref={(el) => { detailSectionRefs.current[2] = el; }}
            data-index="2"
            className={`detailed-feature-section ${visibleSections.has(2) ? 'visible' : ''}`}
          >
            <div className="detailed-feature-layout">
              <div className="detailed-feature-mockup">
                <div className="iphone-frame">
                  <div className="iphone-screen">
                    <div className="dynamic-island"></div>
                    <img
                      alt="AI nutrition analysis in BioAge"
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=600&fit=crop"
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/280x580/f5f5f7/6e6e73?text=AI+Nutrition')}
                    />
                  </div>
                </div>
              </div>
              <div className="detailed-feature-content">
                <h2>AI-Powered Nutrition</h2>
                <p>Let artificial intelligence handle the complexity of nutrition calculations. Simply snap a photo, and our AI does the rest.</p>
                <ul className="detailed-feature-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Instant meal analysis from photos
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Accurate calorie and macro breakdowns
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Smart recommendations based on your goals
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        {/* === CTA SECTION (Dark Band) === */}
        <section id="download" className="dark-cta-band-outer">
          <div className="dark-cta-band">
            <div className="hero-label">
              {SparkleIcon}
              Start Your Journey
            </div>
            <h2>Ready to take control of your health?</h2>
            <p>Download BioAge today and experience the easiest way to track your nutrition and reach your fitness goals.</p>
            <div className="cta-actions">
              <a className="btn btn-light btn-hero-download" href="#">
                {DownloadIcon}
                Download for iOS
              </a>
            </div>
            <p className="cta-disclaimer">Free trial available</p>
          </div>
        </section>
      </main> {/* <--- THIS CLOSING TAG WAS MISSING AND CAUSED ALL THE ERRORS */}

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="brand">
                <div className="brand-icon"></div>
                BioAge
              </div>
              <p className="footer-brand-desc">Simplifying health tracking with advanced AI and a beautiful, minimalist design. Achieve your goals, effortlessly.</p>
              <div className="footer-social">
                <a className="social-icon" href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2 1.5-1.4 2.3-3.3 2-5.1-.3-1.8-.8-3.6-1.7-5.3C5.5 5.5 9 3 13 3c2.7 0 4.9 1 6.8 2.8.2.3.4.7.6 1.1"></path></svg>
                </a>
                <a className="social-icon" href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"></line></svg>
                </a>
                <a className="social-icon" href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
            <div className="footer-contact-section">
              <h3>Contact Us</h3>
              <div className="footer-contact">
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-3l4-4 4 4 4-4z"></path></svg>
                  <a href="mailto:support@bioage.app">support@bioage.app</a>
                </div>
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"></path></svg>
                  <span>Corso Mateotti Giacomo, Lecco 23900</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} BioAge. All rights reserved.</span>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
