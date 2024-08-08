<<<<<<< HEAD
"use client";
import { ImageConstants } from "@/constants/images_constant";
import { useEffect, useState, useCallback } from "react";
=======
import { ImageConstants } from "@/constants/imagesConstant";
>>>>>>> a85a0b3070f288838f9456ec10cc3f29d3edee10

const HeaderSection = () => {
  const [partyTime, setPartyTime] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = useCallback(() => {
    const target = new Date("8/8/2024 23:59:59");
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      setPartyTime(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return (
    <div
      className="min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${ImageConstants.bgHeader.src})`, filter: "brightness(1)" }}
    >
      <div className="flex flex-col justify-center items-center min-h-screen bg-black bg-opacity-30">
        <div className="text-center max-w-4xl my-20 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold py-5 mb-5">
            "Designing The Future : Creative Tech For The Digital Age"
          </h1>
        </div>
        <div className="mt-10">
          {partyTime ? (
            <h1 className="text-2xl sm:text-3xl md:text-4xl">KOMPETISI DIMULAI!!!</h1>
          ) : (
            <div className="timer-wrapper">
  <div className="timer-inner flex flex-wrap justify-center gap-10 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-7xl">
    <div className="timer-segment flex items-center">
      <span className="time">{time.days}</span>
      <span className="label">d</span>
    </div>
    <div className="timer-segment flex items-center">
      <span className="time">{time.hours}</span>
      <span className="label">h</span>
    </div>
    <div className="timer-segment flex items-center">
      <span className="time">{time.minutes}</span>
      <span className="label">m</span>
    </div>
    <div className="timer-segment flex items-center">
      <span className="time">{time.seconds}</span>
      <span className="label">sec</span>
    </div>
  </div>
</div>

          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
