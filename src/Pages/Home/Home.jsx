import style from "./Home.module.scss";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import SpecsCounter from "../../Components/SpecsCounter/SpecsCounter";
import RangeRover from '../../Assets/images/RANGE_ROVER_CAR_PNGBG.png' ;
import Discover from '../../Assets/images/DISCOVERY_CAR_PNGBG.png';
import Defender from '../../Assets/images/DEFENDER_OCTA_CAR_PNGBG.png';
import Jaguar from '../../Assets/images/Jaguar_CAR_PNGBG.png';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, CustomEase);

const Home = () => {
  const cars = [
    {
      name: "Range Rover",
      type: "Model 1",
      img: RangeRover,
    },
    {
      name: "Discovery",
      type: "Model 1",
      img: Discover,
    },
    {
      name: "Defender",
      type: "OCTA",
      img: Defender,
    },
    {
      name: "Jaguar",
      type: "R-Dynamic S",
      img: Jaguar,
    }
  ];
  const [index, setIndex] = useState(0);

  const carAnimateSlide = (direction) => {
    const car = document.querySelector(`.${style.car}`);
    const h1 = document.querySelector(`.${style.section1} h1`);
    const h3 = document.querySelector(`.${style.section1} h3`);

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 1.2 },
    });

    tl.to(
      [h1, h3],
      {
        y: 85,
        opacity: 0,
      },
      0
    );

    tl.to(car, {
    x: direction === "right" ? window.innerWidth : -window.innerWidth,
    opacity: 0,
  }, 0);

    tl.add(() => {
    setIndex((prev) => {
      if (direction === "right") return (prev + 1) % cars.length;
      else return (prev - 1 + cars.length) % cars.length;
    });
  });

  // 4️⃣ Instantly reset car & texts (before re-enter animation)
  tl.set([car], {
    x: direction === "right" ? -window.innerWidth : window.innerWidth,
    y: -10,
    opacity: 0,
  });

    // Re-enter animation
    tl.fromTo(
      car,
      {
        x: direction === "right" ? -200 : 200,
      },
      {
        x: 50,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      [h1, h3],
      {
        y: -20,
        // opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.3"
    );
  };

  return (
    <div>
      <section className={style.section1}>
        <h3>{cars[index].name}</h3>
        <h1>{cars[index].type}</h1>
        <img
          className={style.car}
          src={cars[index].img}
          loading="eager"
          alt="car image"
        />
        <button className={style.leftBtn} onClick={() => carAnimateSlide("left")}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button
          className={style.rightBtn}
          onClick={() => carAnimateSlide("right")}
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
        <div className={style.btns}>
          <button className={style.details}>Show Details</button>
          <button className={style.booking}>Booking Now</button>
        </div>
        <div className={style.socialMedia}>
          <i className="ri-twitter-x-line"></i>
          <i className="ri-facebook-fill"></i>
          <i className="ri-instagram-fill"></i>
        </div>
      </section>

      <div className={style.line}></div>

      <section className={style.section2}>
        <div className={style.headerTexts}>
          <p>{cars[index].name}</p>
        <h2>{cars[index].type}</h2>
        </div>
        <SpecsCounter />
      </section>
    </div>
  );
};

export default Home;
