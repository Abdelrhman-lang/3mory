import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"
const links = [
    { id: 1, icon: FaFacebookF, href: "#", bg: "#1877f2" },
    { id: 2, icon: FaInstagram, href: "#", bg: "#e1306c" },
    { id: 3, icon: FaWhatsapp, href: "#", bg: "#128c7e" },
]

export default function SocialmediaLinks() {
    return (
        <div className="flex items-center justify-center mt-2.5">
            <ul className="flex items-center gap-3">
                {links.map((link) => {
                    return (
                        <li key={link.id} className="w-[30px] h-[30px] rounded-full flex items-center justify-center" style={{ backgroundColor: link.bg }}>
                            <a href={link.href} target="_blank">
                                <link.icon className="text-white" />
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
