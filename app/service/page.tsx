import BrandingSection from '@/components/sections/servicepage/BrandingSection'
import FaqSection from '@/components/sections/servicepage/FaqSection'
import ProcessTimeline from '@/components/sections/servicepage/ProcessTimeline'
import ServiceLetsTalk from '@/components/sections/servicepage/ServiceLetsTalk'
import ServicesHero from '@/components/sections/servicepage/ServicesHero'
import ServicesImages from '@/components/sections/servicepage/ServicesImages'
import ServicesSection from '@/components/sections/servicepage/ServicesSection'
import ServicesWhitePage from '@/components/sections/servicepage/ServicesWhitePage'
import WebDesignSection from '@/components/sections/servicepage/WebDesignSection'
import WebDesignSplitSection from '@/components/sections/servicepage/WebDesignSplitSection'
import React from 'react'

function page() {
  return (
    <div>
      <ServicesHero/>
      <ServicesSection/>
      <ServicesImages/>
      <WebDesignSection/>
      <WebDesignSplitSection/>
      <ServicesWhitePage/>
      {/* <BrandingSection/> */}
      <ProcessTimeline/>
      <ServiceLetsTalk/>
      <FaqSection/>
    </div>
  )
}

export default page
