import React from 'react'
import AnimatedHeading from '../AnimatedHeading'

function WhiteLeftPara() {
  return (
    <div className="w-full max-w-3xl px-4 md:px-0 self-start md:mt-32 md:pl-16">
        <p className="text-sm md:text-base font-medium text-black mb-2">
          ✦ Showcase your story through design
        </p>
        <p className="text-3xl md:text-6xl font-extrabold text-gray-300 leading-tight">
          If you appreciate the beauty in simplicity and value quality...
        </p>
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#171817] px-4 text-center z-20">
        <AnimatedHeading
          text="Let's Talk"
          fromColor="#4e4e4e"
          toColor="#d4d4d8"
          className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6"
        />
        <button className="text-white rounded-3xl border border-lime-200 px-6 py-2 font-medium shadow-[0_4px_30px_rgba(163,230,53,0.5)] hover:shadow-[0_6px_40px_rgba(163,230,53,0.7)] transition-all duration-300">
          Book A Call
        </button>
      </section>
      </div>
  )
}

export default WhiteLeftPara