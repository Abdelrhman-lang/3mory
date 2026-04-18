import { motion } from "motion/react"
import MainButton from "../main-button/MainButton"

export default function SliderText({ imgSrc, imgStyle }) {
    return (
        <div className='flex items-center flex-col text-white'>
            <motion.img key={imgSrc} initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: [0, 1, 1], scale: [0.3, 1.05, 1] }} transition={{ duration: 0.7, ease: "easeInOut", times: [0, 0.7, 1] }} src={imgSrc} alt="content-img" className={`object-cover ${imgStyle}`} loading='lazy' />
            <motion.p initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1], delay: 0.3 }} className='my-5 text-[16px] md:text-lg text-center'>the wooboom spring collection is back at half price</motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-6">
                <MainButton title={"discover more"} />
            </motion.div>
        </div>
    )
}
