import { FaTwitter } from "react-icons/fa6";
import { FaGooglePlusG, FaFacebookF } from "react-icons/fa";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import SecondartBtn from "../secondary-btn/SecondartBtn";
import Copyright from "../copyright/Copyright";


export default function Footer() {
    const titleStyle = "text-primary text-[16px] font-medium capitalize"
    const socialIcons = [
        { id: 1, icon: FaTwitter },
        { id: 2, icon: FaGooglePlusG },
        { id: 3, icon: FaFacebookF },
        { id: 4, icon: TiSocialYoutubeCircular },
    ]
    return (
        <footer className=' px-5'>
            <div className="border-b pb-16">
                <div className='custom-container'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8'>
                        <div className='md:col-span-4 lg:col-span-2'>
                            <div className='flex flex-col gap-5'>
                                <h3 className={titleStyle}>information</h3>
                                <ul className='flex flex-col gap-5 text-[13px] text-accent'>
                                    {["About Us", "Delivery Information", "Privacy Policy", "Terms & Conditions", "Contact Us", "Returns"].map((link) => {
                                        return (
                                            <li key={link}>
                                                {link}
                                            </li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </div>
                        <div className='md:col-span-4 lg:col-span-2'>
                            <div className='flex flex-col gap-5'>
                                <h3 className={titleStyle}>Extras</h3>
                                <ul className='flex flex-col gap-5 text-[13px] text-accent'>
                                    {["Brands", "Gift Certificates", "Affiliate", "Specials", "Site Map", "My Account"].map((link) => {
                                        return (
                                            <li key={link}>
                                                {link}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='md:col-span-4'>
                            <div className='flex flex-col gap-5'>
                                <h3 className={titleStyle}>contact us</h3>
                                {["Address:your address goes here", "Phone:01118282107", "email:abdokhaled766@gmail.com"].map((link) => {
                                    return (
                                        <p key={link} className='text-accent text-[13px]'>{link}</p>
                                    )
                                })}
                                <div className='grid grid-cols-4 max-w-[250px]'>
                                    {socialIcons.map((icon) => {
                                        return (
                                            <div key={icon.id} className="w-[40px] h-[40px] border rounded-full flex items-center justify-center text-accent transition-colors duration-300 hover:text-white hover:bg-black">
                                                <icon.icon size={18} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='md:col-span-4'>
                            <div className='space-y-4'>
                                <h3 className='text-[16px] capitalize text-primary font-medium'>join our newsletter now</h3>
                                <p className='text-accent text-[13px] leading-[1.8]'>Exceptional quality. Ethical factories. Sign up to enjoy free U.S. shipping and returns on your first order.</p>
                                <div className='flex flex-col gap-3'>
                                    <input type="text" className='py-2 px-4 border placeholder:text-xs placeholder:text-accent' placeholder='Enter your email address here...' />
                                    <SecondartBtn title={"subscribe"} className={"py-3"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Copyright />
        </footer>
    )
}
