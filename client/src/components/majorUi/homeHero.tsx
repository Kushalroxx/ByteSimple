import React from 'react'
import Orb from '../ui/Backgrounds/Orb/Orb'
import Squares from '../ui/Backgrounds/squares/squares'
import HomeText from './homeText'
import HomeLogo from './homeLogo'

export default function HomeHero() {
  return (
    <div className="bg-black h-[92vh] md:h-screen w-screen overflow-y-hidden relative">
      <div className="relative h-screen w-full">
        {/* Desktop background */}
        <div className="absolute inset-0 z-10 opacity-17 hidden md:flex justify-center items-center">
          <Squares
            speed={0.5}
            squareSize={60}
            direction="diagonal"
            borderColor="#fff"
            hoverFillColor="#888"
          />
        </div>

        {/* Mobile background */}
        <div className="absolute inset-0 z-10 opacity-60 flex md:hidden justify-center items-center">
          <Orb
            hoverIntensity={0.05}
            rotateOnHover={true}
            hue={758}
            forceHoverState={true}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">
         <section className="h-screen w-screen flex flex-col justify-center">
      <div id="hero" className="h-dvh flex justify-between items-center gap-10">
        <HomeText/>
        <div id="logo" className=" h-full w-full overflow-hidden hidden relative md:flex ">
          <HomeLogo />
        </div>
      </div>
    </section>
        </div>
      </div>
    </div>
  )
}
