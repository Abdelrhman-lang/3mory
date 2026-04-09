import HeaderLinks from "../header-links/HeaderLinks";

export default function HeaderBottom() {
    return (
        <div className='hidden lg:flex px-8 '>
            <div className='container mx-auto'>
                <div className='flex items-center justify-center'>
                    <HeaderLinks
                        ulClassName="flex items-center"
                        liClassname="text-primary text-sm font-medium  tracking-wide px-[25px] py-[15px] hover:text-secondary  transition-all duration-300"
                    />
                </div>
            </div>
        </div>
    )
}