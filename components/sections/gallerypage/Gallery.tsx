// 'use client';

// import React from 'react';
// import cn from 'classnames';

// const galleryItems = [
//   { text: 'jelly-o brownie sweet' },
//   { text: 'muffin jelly gingerbread', size: 'large' },
//   { text: 'sesame snaps chocolate', size: 'medium' },
//   { text: 'oat cake', size: 'large' },
//   { text: 'jujubes cheesecake', size: 'full' },
//   { text: 'dragée pudding brownie', size: 'medium' },
//   { text: 'oat cake again', size: 'large' },
//   { text: 'powder toffee' },
//   { text: 'pudding cheesecake', size: 'medium' },
//   { text: 'toffee bear claw', size: 'large' },
//   { text: 'cake cookie croissant' },
//   { text: 'liquorice sweet roll', size: 'medium' },
//   { text: 'chocolate marzipan', size: 'medium' },
//   { text: 'danish dessert lollipop', size: 'large' },
//   { text: 'sugar plum dragée' },
// ];

// const bgImages = [
//   'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc',
//   'https://images.unsplash.com/photo-1422255198496-21531f12a6e8',
//   'https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90',
//   'https://images.unsplash.com/photo-1476097297040-79e9e1603142',
//   'https://images.unsplash.com/photo-1464652149449-f3b8538144aa',
// ];

// export default function Gallery() {
//   return (
//     <section className="p-4 md:p-8 md:px-24 px-0">
//       <h1 className="text-2xl font-bold mb-6 text-center">Nom Nom Gallery</h1>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 auto-rows-[150px] grid-flow-dense ">
//         {galleryItems.map((item, index) => {
//           const bg = bgImages[index % bgImages.length];
//           const sizeClass = cn({
//             'row-span-2': item.size === 'medium',
//             'row-span-3': item.size === 'large',
//             'col-span-full md:col-span-full row-span-2': item.size === 'full',
//           });

//           return (
//             <div
//               key={index}
//               className={cn(
//                 'relative flex flex-col rounded-lg justify-end p-4 bg-cover bg-center transition-transform duration-300 cursor-pointer hover:scale-105',
//                 sizeClass
//               )}
//               style={{ backgroundImage: `url(${bg})` }}
//             >
//               <div className="absolute inset-0 bg-black opacity-30 hover:opacity-0 transition-opacity duration-300" />
//               <div className="relative z-10  text-sm text-gray-600 p-2">
//                 <span className="font-bold mr-2">{index + 1}.</span>
//                 {item.text.toLowerCase()}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
'use client';

import React from 'react';
import cn from 'classnames';

const galleryItems = [
  { text: 'jelly-o brownie sweet' },
  { text: 'muffin jelly gingerbread', size: 'large' },
  { text: 'sesame snaps chocolate', size: 'medium' },
  { text: 'oat cake', size: 'large' },
  { text: 'jujubes cheesecake', size: 'full' },
  { text: 'dragée pudding brownie', size: 'medium' },
  { text: 'oat cake again', size: 'large' },
  { text: 'powder toffee' },
  { text: 'pudding cheesecake', size: 'medium' },
  { text: 'toffee bear claw', size: 'large' },
  { text: 'cake cookie croissant' },
  { text: 'liquorice sweet roll', size: 'medium' },
  { text: 'chocolate marzipan', size: 'medium' },
  { text: 'danish dessert lollipop', size: 'large' },
  { text: 'sugar plum dragée' },
];

const bgImages = [
  'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc',
  'https://images.unsplash.com/photo-1422255198496-21531f12a6e8',
  'https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90',
  'https://images.unsplash.com/photo-1476097297040-79e9e1603142',
  'https://images.unsplash.com/photo-1464652149449-f3b8538144aa',
];

export default function Gallery() {
  return (
    <section className="p-4 md:p-8 md:px-24 px-2">
      <h1 className="text-2xl font-bold mb-6 text-center">Nom Nom Gallery</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 auto-rows-[150px] grid-flow-dense">
        {galleryItems.map((item, index) => {
          const bg = bgImages[index % bgImages.length];

          const sizeClass = cn({
            'row-span-2': item.size === 'medium',
            'row-span-3': item.size === 'large',
            'col-span-full md:col-span-full row-span-2': item.size === 'full',
          });

          return (
            <div
              key={index}
              className={cn(
                'group relative flex flex-col justify-end rounded-xl overflow-hidden bg-cover bg-center transition-transform duration-300 cursor-pointer hover:scale-105',
                sizeClass
              )}
              style={{ backgroundImage: `url(${bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/0" />

              {/* Title */}
              <div className="relative z-10  text-white text-sm p-2 transition-opacity duration-300 group-hover:opacity-100 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                {item.text.toLowerCase()}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
