import React from 'react'

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  subHeading?: string;
}

const Heading:React.FC<HeadingProps> =({
    children,
    className,
    subHeading
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 text-7xl font-bold text-gray-900 dark:text-white'>
      {children}
    </div>
    <span>
      {subHeading}
    </span>
    </div>
  )
}

export default Heading
