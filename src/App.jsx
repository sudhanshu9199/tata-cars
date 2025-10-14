import Home from "./Pages/Home/Home"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother);

const App = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default App