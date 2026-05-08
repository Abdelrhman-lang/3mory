import HeaderLinks from "../header-links/HeaderLinks";

export default function HeaderBottom() {
    return (
        <div className='hidden lg:flex justify-center items-center'>

            <HeaderLinks
                ulClassName="flex items-center"
                liClassname="text-primary text-sm font-medium  tracking-wide px-[25px] py-[15px] hover:text-secondary  transition-all duration-300"
            />


        </div>
    )
}