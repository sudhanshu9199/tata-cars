import style from "./Home.module.scss";
import Navbar from "../../Components/Navbar/Navbar";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const Home = () => {
  const cars = [
    {
      name: "Range Rover",
      type: "Type 00",
      img: "https://freepngimg.com/thumb/car/2-2-car-transparent.png",
    },
    {
      name: "BMW",
      type: "M4 GTR",
      img: "https://www.pngall.com/wp-content/uploads/5/Vehicle-PNG-Image.png",
    },
    {
      name: "Audi",
      type: "R8",
      img: "https://pngimg.com/d/mercedes_PNG80152.png",
    },
  ];
  const [index, setIndex] = useState(0);

  const animateSlide = (direction) => {
    const car = document.querySelector(`.${style.car}`);
    const h1 = document.querySelector(`.${style.section1} h1`);
    const h3 = document.querySelector(`.${style.section1} h3`);

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut", duration: 1.2 },
    });

    tl.to(
      [h1, h3],
      {
        y: 80,
        opacity: 0,
      },
      0
    );

    tl.to(
      car,
      {
        x: direction === "right" ? window.innerWidth : -window.innerWidth,
        opacity: 0,
      },
      0
    );

    tl.add(() => {
      setIndex((prev) => {
        if (direction === "right") return (prev + 1) % cars.length;
        else return (prev - 1 + cars.length) % cars.length;
      });
    });

    // 4️⃣ Instantly reset car & texts (before re-enter animation)
    tl.set([car, h1, h3], {
      x: direction === "right" ? -window.innerWidth : window.innerWidth,
      y: -80,
      opacity: 0,
    });

    // 5️⃣ Animate new car driving in & texts rising in
    tl.to(car, {
      x: 0,
      opacity: 1,
    });
    tl.to(
      [h1, h3],
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
      },
      "-=0.6"
    ); // syncs with car movement
  };
  return (
    <div>
      <Navbar />
      <div className={style.section1}>
        <h3>{cars[index].name}</h3>
        <h1>{cars[index].type}</h1>
        <img
          className={style.car}
          src={cars[index].img}
          loading="eager"
          alt="car image"
        />
        <button className={style.leftBtn} onClick={() => animateSlide("left")}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button
          className={style.rightBtn}
          onClick={() => animateSlide("right")}
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
      </div>

      <div className="section2"></div>
    </div>
  );
};

export default Home;
