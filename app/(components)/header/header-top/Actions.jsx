import { FaShoppingBasket } from "react-icons/fa";

export default function Actions() {
    return (
        <div className='hidden lg:flex lg:w-1/4 justify-end'>
            <div className='flex items-center gap-5'>
                <div>
                    <ul className='flex items-center gap-3 text-primary text-xs'>
                        <li>Login</li>
                        <li>/</li>
                        <li>Register</li>
                    </ul>
                </div>
                <div className='border px-4 py-2.5 rounded-full'>
                    <div className="flex items-center gap-2 text-xs text-accent">
                        <FaShoppingBasket size={20} /> 2 Item(s)
                    </div>
                </div>
            </div>
        </div>
    )
}
