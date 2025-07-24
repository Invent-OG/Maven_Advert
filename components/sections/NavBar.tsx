// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { Menu, X } from "lucide-react";
// import Link from "next/link";

// export default function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navRef = useRef<HTMLDivElement>(null);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const lastScrollY = useRef(0);

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   // Animate full-screen menu in/out
//   useEffect(() => {
//     if (menuRef.current) {
//       gsap.to(menuRef.current, {
//         y: menuOpen ? 0 : "-100%",
//         duration: 0.6,
//         ease: "power4.inOut",
//       });
//     }
//   }, [menuOpen]);

//   // Navbar hide/show on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       if (navRef.current) {
//         if (currentScrollY > lastScrollY.current + 10) {
//           navRef.current.style.transform = "translateY(-100%)";
//         } else if (currentScrollY < lastScrollY.current - 10) {
//           navRef.current.style.transform = "translateY(0)";
//         }
//         lastScrollY.current = currentScrollY;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {/* Top Navbar */}
//       <div
//         ref={navRef}
//         className="fixed rounded-4xl top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 md:py-5  backdrop-blur-md text-white transition-transform duration-500"
//       >
//         <div className="text-xl md:text-2xl font-bold">maven advert</div>
//         <div className="flex items-center gap-6 md:gap-12">
//           <button className="text-sm md:text-base pb-[1px] border-b-2 border-transparent hover:border-red-600 transition-all duration-300 hidden md:block">
//             Let's Talk
//           </button>
//           <button onClick={toggleMenu} aria-label="Toggle Menu">
//             {menuOpen ? <X size={26} className="text-black" /> : <Menu size={26} />}
//           </button>
//         </div>
//       </div>

//       {/* Full-screen Mobile Menu */}
//       <div
//         ref={menuRef}
//         className="fixed top-0 left-0 w-full h-screen bg-white text-black z-40 flex justify-center items-center transform -translate-y-full"
//       >
//         <nav className="flex flex-col items-center gap-8 text-xl font-semibold md:text-2xl md:flex-row">
//           <Link href="#services" onClick={() => setMenuOpen(false)}>
//             Our Services
//           </Link>
//           <Link href="#projects" onClick={() => setMenuOpen(false)}>
//             Project Gallery
//           </Link>
//           <Link href="#about" onClick={() => setMenuOpen(false)}>
//             Learn About Us
//           </Link>
//           <Link href="#work" onClick={() => setMenuOpen(false)}>
//             Work With Us
//           </Link>
//         </nav>
//       </div>
//     </>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Lock body scroll when menu is open
  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto"; // cleanup
    };
  }, [menuOpen]);

  // Animate full-screen menu in/out
  useEffect(() => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        y: menuOpen ? 0 : "-100%",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [menuOpen]);

  // Navbar hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (navRef.current) {
        if (currentScrollY > lastScrollY.current + 10) {
          navRef.current.style.transform = "translateY(-100%)";
        } else if (currentScrollY < lastScrollY.current - 10) {
          navRef.current.style.transform = "translateY(0)";
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <div
        ref={navRef}
        className="fixed rounded-4xl top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 md:py-5 backdrop-blur-md text-white transition-transform duration-500"
      >
        <div className="text-xl md:text-2xl font-bold">maven advert</div>
        <div className="flex items-center gap-6 md:gap-12">
          <button className="text-sm md:text-base pb-[1px] border-b-2 border-transparent hover:border-red-600 transition-all duration-300 hidden md:block">
            Let's Talk
          </button>
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <X size={26} className="text-black" /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen bg-white text-black z-40 flex justify-center items-center transform -translate-y-full"
      >
        <nav className="flex flex-col items-center gap-8 text-xl font-semibold md:text-2xl md:flex-row">
          <Link href="#services" onClick={() => setMenuOpen(false)}>
            Our Services
          </Link>
          <Link href="#projects" onClick={() => setMenuOpen(false)}>
            Project Gallery
          </Link>
          <Link href="#about" onClick={() => setMenuOpen(false)}>
            Learn About Us
          </Link>
          <Link href="#work" onClick={() => setMenuOpen(false)}>
            Work With Us
          </Link>
        </nav>
      </div>
    </>
  );
}
