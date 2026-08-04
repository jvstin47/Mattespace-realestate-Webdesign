import React, { useEffect, useState } from 'react';
import { preloadFrames } from './utils/framePreloader';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import ScrollHero from './components/ScrollHero';
import Amenities from './components/Amenities';
import Residences from './components/Residences';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    preloadFrames({
      onProgress: setLoadProgress,
      onReady: () => setIsReady(true),
      onComplete: () => setLoadProgress(100)
    });
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
  };

  return (
    <>
      <CustomCursor />
      
      {!hasEntered && (
        <Preloader 
          progress={loadProgress} 
          isReady={isReady} 
          onEnter={handleEnter} 
        />
      )}
      
      <div 
        className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}
      >
        <Navbar />
        <main>
          <ScrollHero />
          <Amenities />
          <Residences />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>

      <div className="grain pointer-events-none fixed inset-0 z-[9997]" />
    </>
  );
}

export default App;
