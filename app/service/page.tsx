import ServicesHero from '@/components/sections/servicepage/ServicesHero'
import ServicesImages from '@/components/sections/servicepage/ServicesImages'
import ServicesSection from '@/components/sections/servicepage/ServicesSection'
import React from 'react'

function page() {
  return (
    <div>
      <ServicesHero/>
      <ServicesSection/>
      <ServicesImages/>
    </div>
  )
}

export default page
