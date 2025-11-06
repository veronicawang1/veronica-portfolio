"use client";

import { DATA } from "@/app/data";
import {
  AboutMe,
  Blogs,
  Contact,
  Experience,
  Footer,
  Header,
  Navbar,
  Projects,
  Skills,
} from "@/components/sections";

import DarkVeil from "@/blocks/Backgrounds/DarkVeil/DarkVeil";

import TargetCursor from "@/components/ui/target-cursor";
import useMobileDetection from "@/hooks/use-mobile";

export default function Page() {
  const checkMobile = useMobileDetection();

  return (
    <>
      <div 
        className="absolute inset-0 z-[-1] h-screen dark:block hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
        }}
      >
        <DarkVeil />
      </div>


      <div className="mx-auto px-4 pt-6 sm:pt-12 w-full lg:w-2/3 xl:w-1/2 text-foreground">
        <Navbar />

        {/* <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      /> */}
        {/* <div className="absolute inset-0 z-[-1]">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>
      <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        /> */}

        {/* <div className="absolute inset-0 z-[-1]">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div> */}
      



        <main className="px-4 min-h-lvh">

          <Header data={DATA.HEADER} />
          <AboutMe data={DATA.ABOUT_ME} />
          <Experience data={DATA.EXPERIENCE} />
          <Projects data={DATA.PROJECTS} all={DATA.ALL_PROJECTS} />
          <Blogs data={DATA.BLOGS} />
          <Skills data={DATA.SKILLS} />
          {/* <Contact data={DATA.HEADER} /> */}
          <Footer />
        </main>

        {!checkMobile && <TargetCursor spinDuration={2} hideDefaultCursor />}
      </div>
    </>
  );
}
