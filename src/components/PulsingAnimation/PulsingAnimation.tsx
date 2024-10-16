import { useState, useEffect } from 'react';
import frame1 from "../../assets/images/pulsing-animation/pulse-frame-1.svg"
import frame2 from "../../assets/images/pulsing-animation/pulse-frame-2.svg"
import frame3 from "../../assets/images/pulsing-animation/pulse-frame-3.svg"
import frame4 from "../../assets/images/pulsing-animation/pulse-frame-4.svg"

const PulsingAnimation = () => {
const [currentState, setCurrentState] = useState(0);
  const states = [
    { image: frame1 , color: 'text-gray-300' },
    { image: frame2 , color: 'text-gray-400' },
    { image: frame3 , color: 'text-gray-600' },
    { image: frame4 , color: 'text-gray-800' },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentState((prevState) => (prevState + 1) % states.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-12 h-12 mx-auto border-none">
      <div className="flex items-center justify-center h-full">
        <div className={`transition-all duration-500 ${states[currentState].color}`}>
          <img 
            src={states[currentState].image} 
            alt={`Emoticon state ${currentState}`} 
            className="transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );

}

export default PulsingAnimation