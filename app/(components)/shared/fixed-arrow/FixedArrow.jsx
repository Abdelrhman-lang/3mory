"use client"
import { useEffect, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function FixedArrow() {
    const [isScrolled, setIsScrolled] = useState(false)
    useEffect(() => {
        const handelScroll = () => {
            if (scrollY > 200) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener("scroll", handelScroll)
        return () => {
            window.removeEventListener("scroll", handelScroll)
        }
    }, [])
    return (
        <AnimatePresence>
            {isScrolled && (
                <motion.button initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }} className={`fixed bottom-5 right-5 lg:bottom-10 lg:right-10 cursor-pointer z-40 w-[45px] h-[45px] bg-black text-white transition-colors duration-300 hover:text-secondary rounded-full flex items-center justify-center ${isScrolled ? "opacity-100" : "opacity-0"}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <FaAngleDoubleUp />
                </motion.button>
            )}

        </AnimatePresence>

    )
}
