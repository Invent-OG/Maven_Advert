import Gallery from '@/components/sections/gallerypage/Gallery'
import GridShowcase from '@/components/sections/gallerypage/GridShowcase'
import HeroGallery from '@/components/sections/gallerypage/HeroGallery'
import LetsTalkGallery from '@/components/sections/gallerypage/LetsTalkGallery'
import OurWorkGallery from '@/components/sections/gallerypage/OurWorkGallery'
import HeroImages from '@/components/sections/HeroImages'
import React from 'react'

function page() {
  return (
    <>
      <HeroGallery/>
      <OurWorkGallery/>
      {/* <Gallery/> */}
      <GridShowcase/>
      <LetsTalkGallery/>
    </>
  )
}

export default page
