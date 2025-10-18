import style from "./Home.module.scss";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SpecsCounter from "../../Components/SpecsCounter/SpecsCounter";
import RangeRover from "../../Assets/images/RANGE_ROVER_CAR_PNGBG.png";
import Discover from "../../Assets/images/DISCOVERY_CAR_PNGBG.png";
import Defender from "../../Assets/images/DEFENDER_OCTA_CAR_PNGBG.png";
import Jaguar from "../../Assets/images/Jaguar_CAR_PNGBG.png";
import DefenderTopVideo from "../../assets/videos/Defender_OCTA_Black​.mp4";
import RangeRoverTopVideo from "../../assets/videos/Range_Rover.mp4";
import DiscoveryTopVideo from "../../assets/videos/Discovery.mp4";
import JaguarTopVideo from "../../assets/videos/Jaguar_F-PACE.mp4";
import DiscoveryStartVideo from'../../assets/videos/DiscoveryStartBtnVideo.mp4';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, CustomEase, ScrollToPlugin);

const Home = () => {
  const cars = [
    {
      name: "Range Rover",
      type: "Model 1",
      img: RangeRover,
      TopVideo: RangeRoverTopVideo,
      section3: {
        title: "LEAD BY EXAMPLE",
        subtitle: "Designed in the UK and built in India.",
      },
    },
    {
      name: "Discovery",
      type: "Model 1",
      img: Discover,
      TopVideo: DiscoveryTopVideo,
      section3: {
        title: "NEVER STOP",
        subtitle: "DISCOVERING",
      },
    },
    {
      name: "Defender",
      type: "OCTA",
      img: Defender,
      TopVideo: DefenderTopVideo,
      section3: {
        title: `Embrace the Impossible`,
        subtitle: "Since 1948",
      },
    },
    {
      name: "Jaguar",
      type: "R-Dynamic S",
      img: Jaguar,
      TopVideo: JaguarTopVideo,
      section3: {
        title: "THE NEW ERA",
        subtitle: "This is the Jaguar renaissance.",
      },
    },
  ];
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);
  const [section3Data, setSection3Data] = useState(cars[0].section3);

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
  const handleShowDetails = () => {
    const section2 = document.getElementById("section2");
    const video = document.getElementById("defenderTopVideo");

    if (section2) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: "#section2",
          offsetY: 0
        },
        ease: "power2.inOut",
      });
    }

    if (videoRef.current) {
      videoRef.current.src = cars[index].TopVideo;
      videoRef.current.load();
      videoRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
    }

    setSection3Data(cars[index].section3);
  };

  const sec3Video = useRef(null);
  useEffect(() => {
    const video = sec3Video.current;

    video.pause();

    ScrollTrigger.create({
      trigger: `.${style.section3}`,
      start: 'top 80%',
      onEnter: () => {
        video.play();
      }
    });
    return () => ScrollTrigger.killAll();
  }, []);

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
        <button
          className={style.leftBtn}
          onClick={() => carAnimateSlide("left")}
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
        <button
          className={style.rightBtn}
          onClick={() => carAnimateSlide("right")}
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
        <div className={style.btns}>
          <button className={style.details} onClick={handleShowDetails}>
            Show Details
          </button>
          <button className={style.booking}>Booking Now</button>
        </div>
        <div className={style.socialMedia}>
          <i className="ri-twitter-x-line"></i>
          <i className="ri-facebook-fill"></i>
          <i className="ri-instagram-fill"></i>
        </div>
      </section>

      <div className={style.line}></div>

      <section className={style.section2} id="section2">
        <video
          id="defenderTopVideo"
          ref={videoRef}
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
        ></video>
        {/* <div className={style.headerTexts}>
          <p>{cars[index].name}</p>
          <h2>{cars[index].type}</h2>
        </div> */}
      </section>
      <section className={style.section3}>
        <div className={style.leftTexts}>
          <h2>{section3Data.title}</h2>
        <p>{section3Data.subtitle}</p>
        <button>
          <i class="ri-arrow-right-up-long-line"></i>
          <p>Discover</p>
        </button>
        </div>
        <div className={style.rightImgs}>
          <img className={style.a} src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" alt="" />
          <img className={style.b} src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" alt="" />
          <img className={style.c} src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9kZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" alt="" />
          <video className={style.d} ref={sec3Video} muted loop playsInline src={DiscoveryStartVideo}></video>
        </div>
      </section>
    </div>
  );
};

export default Home;
