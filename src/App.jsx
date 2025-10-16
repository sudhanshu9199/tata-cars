import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Navbar from "./Components/Navbar/Navbar.jsx";
import MainRoute from "./Routes/MainRoute";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother);

const App = () => {
  return (
    <div>
      <Navbar />
      <MainRoute />
    </div>
  )
}

export default App