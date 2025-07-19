import React from 'react'

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const Heading:React.FC<HeadingProps> =({
    children,
    level,
    className,
}) => {
  return (
    <div className='flex items-center gap-2 text-7xl font-bold text-gray-900 dark:text-white'>
      {children}
    </div>
  )
}

export default Heading
