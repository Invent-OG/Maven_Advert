"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const router = useRouter();

  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  // Lock body scroll when menu is open
  useEffect(() => {
    const body = document.body;
    if (menuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
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
      {/* <div
        ref={navRef}
        className="fixed rounded-4xl top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16  py-4 md:py-5 backdrop-blur-3xl text-white transition-transform duration-500"
      > */}
      <div
        ref={navRef}
        className="fixed rounded-4xl top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 md:py-5 bg-black/20 backdrop-blur text-white transition-transform duration-500"
      >
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer text-xl md:text-2xl font-bold text-white"
        >
          maven advert
        </div>
        <div className="flex items-center gap-6 md:gap-12 ">
          {/* <button className="text-sm md:text-base pb-[1px] border-b-2 border-transparent hover:border-white/50 transition-all duration-300 hidden md:block">
            Let's Talk
          </button> */}
          <button className="relative group text-sm md:text-sm hidden md:block pb-1">
            <span className="inline-block">Let's Talk</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>

          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? (
              <X size={26} className="text-black" />
            ) : (
              <Menu size={26} />
            )}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen bg-white  text-neutral-800 z-40 flex justify-center items-center transform -translate-y-full"
      >
        <nav className="flex flex-col items-center gap-8 text-xl font-bold md:text-3xl md:flex-row">
          <Link
            href="/service"
            onClick={() => setMenuOpen(false)}
            className="relative group pb-4"
          >
            <span className="inline-block">Our Services</span>
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#DDF694] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom" />
          </Link>

          <Link
            href="/gallery"
            onClick={() => setMenuOpen(false)}
            className="relative group pb-4"
          >
            <span className="inline-block">Project Gallery</span>
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#DDF694] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom" />
          </Link>

          <Link
            href="/aboutus"
            onClick={() => setMenuOpen(false)}
            className="relative group pb-4"
          >
            <span className="inline-block">Learn About Us</span>
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#DDF694] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom" />
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="relative group pb-4"
          >
            <span className="inline-block">Work With Us</span>
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#DDF694] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom" />
          </Link>
        </nav>
      </div>
    </>
  );
}
