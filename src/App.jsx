import { useEffect, useRef } from "react";
import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./App.css";

import flowerImg1 from "./assets/1.jpg";
import flowerImg2 from "./assets/2.jpg";
import flowerImg3 from "./assets/3.jpg";
import flowerImg4 from "./assets/4.jpg";
import flowerImg5 from "./assets/5.png";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const frameCount = 300;
  const [active, setActive] = useState(0);

  // ✅ FIXED: now uses /public instead of /src
  const framePath = (index) =>
    `/frames/frame_${String(index).padStart(3, "0")}.png`;

  // simple cache so we don't spam reload images
  const imageCache = useRef({});

  const getImage = (index) => {
    if (!imageCache.current[index]) {
      const img = new Image();
      img.src = framePath(index);
      imageCache.current[index] = img;
    }
    return imageCache.current[index];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    contextRef.current = ctx;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = new Image();
    img.src = framePath(1);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const discoverData = [
    {
      title: "Cosmos Variants",
      text: "Different species of Garden Cosmos with soft floral tones.",
    },
    {
      title: "Growth Stages",
      text: "From seed to full bloom — a visual life cycle.",
    },
    {
      title: "Environment",
      text: "Cosmos thrive in warm, lightly dry environments.",
    },
    {
      title: "Care Guide",
      text: "Minimal watering, full sun, and light soil conditions.",
    },
  ];

  // -----------------------------
  // SCROLL ANIMATION
  // -----------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    if (!canvas || !ctx) return;

    const render = (index) => {
      const img = getImage(index);

      if (!img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const trigger = ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "+=1500",
      scrub: true,
      pin: false,
      onUpdate: (self) => {
        const frame = Math.min(
          frameCount - 1,
          Math.floor(self.progress * frameCount)
        );

        render(frame);
      },
    });

    return () => trigger.kill();
  }, []);

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <>
      <section className="hero1">
        <nav>
          <ul className="links">
            <li>Home</li>
            <li>Discover</li>
            <li>About</li>
            <li>Help Us Grow</li>
          </ul>
        </nav>

        <div className="firstbackground">
          <h1 className="h1intro">Rose of Winter</h1>
          <p className="pintro">Camelia japonica</p>
          <p className="pintro">
            Elegant evergreen bloom. It thrives in cold months, symbolizing
            quiet strength and timeless beauty.
          </p>
        </div>
      </section>

      <section className="hero">
        <canvas ref={canvasRef} className="hero-canvas" />
      </section>

      <section>
        <h1 className="title2">Discover</h1>
      </section>

      <section className="discover">
        <div className="discover-menu">
          {discoverData.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${active === index ? "active" : ""}`}
              onClick={() => setActive(index)}
            >
              <span className="dot"></span>
              {item.title}
            </div>
          ))}
        </div>

        <div className="discover-content">
          <h2>{discoverData[active].title}</h2>
          <p>{discoverData[active].text}</p>
        </div>
      </section>
    </>
  );
}