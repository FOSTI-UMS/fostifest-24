"use client";
import { useEffect, useState } from "react";
import { ImageConstants } from "@/constants/imagesConstant";
import { useUser } from "@/store/userContext";

const HeaderSection = () => {
  const {loading, sectionRefs} = useUser();
  const [registerTimeEnded, setRegisterTimeEnded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const countdownDate = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_END_DATE || "").getTime();

    const updateCountdown = () => {
      const now = new Date();
      const localTimeOffset = now.getTimezoneOffset() * 60000;
      const indonesiaTimeOffset = 7 * 60 * 60000;
      const localTime = now.getTime() + localTimeOffset;
      const indonesiaTime = localTime + indonesiaTimeOffset;

      const distance = countdownDate - indonesiaTime;

      if (distance <= 0) {
        setRegisterTimeEnded(true)
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining({ days, hours, minutes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRefs.home} id="home" className=" min-h-screen bg-center bg-cover" style={{ backgroundImage: `url(${ImageConstants.bgHeader.src})`, filter: "brightness(1)" }}>
      <div className="flex flex-col justify-center items-center min-h-screen bg-black bg-opacity-50">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold py-5">&quot;Designing The Future : Creative Tech For The Digital Age&quot;</h1>
        </div>
        <div className="absolute bottom-5">
          {loading || registerTimeEnded ? (
            <span />
          ) : (
            <div className="timer-wrapper text-outline">
              <div className="timer-inner flex flex-wrap justify-center gap-3 sm:gap-10 font-bold text-5xl md:text-8xl">
                <div className="timer-segment flex items-center">
                  <span className="time">{String(timeRemaining.days).padStart(2, "0")}</span>
                  <span className="label">d</span>
                </div>
                <div className="timer-segment flex items-center">
                  <span className="time">{String(timeRemaining.hours).padStart(2, "0")}</span>
                  <span className="label">h</span>
                </div>
                <div className="timer-segment flex items-center">
                  <span className="time">{String(timeRemaining.minutes).padStart(2, "0")}</span>
                  <span className="label">m</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
