import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const letters = "VROOM CI".split("");
  
  // Couleurs du drapeau ivoirien: Orange, Blanc, Vert
  const getLetterColor = (index: number) => {
    const colors = [
      "hsl(29, 100%, 50%)", // Orange (V)
      "hsl(29, 100%, 50%)", // Orange (R)
      "hsl(0, 0%, 100%)",   // Blanc (O)
      "hsl(0, 0%, 100%)",   // Blanc (O)
      "hsl(0, 0%, 100%)",   // Blanc (M)
      "hsl(153, 100%, 36%)", // Vert (espace)
      "hsl(153, 100%, 36%)", // Vert (C)
      "hsl(153, 100%, 36%)", // Vert (I)
    ];
    return colors[index] || "hsl(29, 100%, 50%)";
  };

  useEffect(() => {
    if (currentLetterIndex < letters.length) {
      const timer = setTimeout(() => {
        setCurrentLetterIndex(currentLetterIndex + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLetterIndex, letters.length, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex items-center gap-1 sm:gap-2">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`font-heading text-5xl sm:text-7xl md:text-8xl font-bold transition-all duration-500 ${
              index <= currentLetterIndex
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-50 blur-sm"
            }`}
            style={{
              color: getLetterColor(index),
              textShadow: index <= currentLetterIndex 
                ? `0 0 20px ${getLetterColor(index)}40, 0 0 40px ${getLetterColor(index)}20`
                : "none",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
