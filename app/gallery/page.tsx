import Gallery from '@/components/sections/gallerypage/Gallery'
import GridShowcase from '@/components/sections/gallerypage/GridShowcase'
import HeroGallery from '@/components/sections/gallerypage/HeroGallery'
import LetsTalkGallery from '@/components/sections/gallerypage/LetsTalkGallery'
import HeroImages from '@/components/sections/HeroImages'
import React from 'react'

function page() {
  return (
    <>
      <HeroGallery/>
      <LetsTalkGallery/>
      {/* <Gallery/> */}
      <GridShowcase/>
    </>
  )
}

export default page
