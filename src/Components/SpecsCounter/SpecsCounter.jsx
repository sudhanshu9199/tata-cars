import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import style from "./SpecsCounter.module.scss";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const SpecsCounter = () => {
  const sectionRef = useRef(null);
  const specs = [
    { label: "0–100 km/h", value: 3.4, suffix: "s" },
    { label: "Top Speed", value: 320, suffix: " km/h" },
    { label: "Horsepower", value: 650, suffix: " hp" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      CustomEase.create("smoothInOut", "M0,0 C0.5,0 0.2,1 1,1");

      specs.forEach((spec, i) => {
        const el = document.querySelector(`#spec-${i} .${style.number}`);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: spec.value,
          duration: 2,
          ease: "smoothInOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent =
              spec.value % 1 === 0
                ? Math.floor(obj.val) + spec.suffix
                : obj.val.toFixed(1) + spec.suffix;
          },
        });
      });

      // Subtle hover animation for micro-interaction ✨
      gsap.utils.toArray(`.${style.specBox}`).forEach((box) => {
        box.addEventListener("mouseenter", () =>
          gsap.to(box, { scale: 1.05, duration: 0.3, ease: "power2.out" })
        );
        box.addEventListener("mouseleave", () =>
          gsap.to(box, { scale: 1, duration: 0.3, ease: "power2.out" })
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={style.section2}>
      <h2 className={style.heading}>Performance Specs ⚡</h2>
      <div className={style.specsGrid}>
        {specs.map((spec, i) => (
          <div id={`spec-${i}`} key={i} className={style.specBox}>
            <div className={style.number}>0</div>
            <div className={style.label}>{spec.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecsCounter;
