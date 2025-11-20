import React, { useState, useEffect } from 'react';
import ColorDisplay from './components/ColorDisplay';
import InfoCard from './components/InfoCard';
import SearchOverlay from './components/SearchOverlay';
import { colors } from './data/colors';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize with a "Daily" color based on date, but allow navigation
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const initialIndex = dayOfYear % colors.length;
    setCurrentIndex(initialIndex);
  }, []);

  const currentColor = colors[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % colors.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + colors.length) % colors.length);
  };

  const handleSelectColor = (color) => {
    const index = colors.findIndex(c => c.id === color.id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  // Update CSS variable for dynamic theming
  useEffect(() => {
    document.documentElement.style.setProperty('--current-color', currentColor.hex);
  }, [currentColor]);

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <div
      className="app-container"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <button
        className="search-toggle-btn"
        onClick={() => setIsSearchOpen(true)}
        title="Search Colors"
      >
        🔍
      </button>

      <ColorDisplay color={currentColor} />
      <InfoCard
        color={currentColor}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {isSearchOpen && (
        <SearchOverlay
          onSelectColor={handleSelectColor}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
