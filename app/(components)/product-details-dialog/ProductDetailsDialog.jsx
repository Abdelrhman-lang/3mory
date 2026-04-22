import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductDetailsDialogImgs from "./ProductDetailsDialogImgs"
import { Select } from "@/components/ui/select"
const smallImgs = [
    { id: 1, src: "/imgs/product2.webp" },
    { id: 2, src: "/imgs/product3.webp" },
    { id: 3, src: "/imgs/product2.webp" },
    { id: 4, src: "/imgs/product1.webp" },
]
export function ProductDetailsDialog() {
    return (
        <Dialog className={"overflow-y-scroll"}>
            <form>
                <DialogTrigger asChild>
                    <div className='absolute left-0 -bottom-full capitalize text-sm bg-secondary text-white w-full py-2 transition-all duration-400 group-hover:bottom-0'>
                        quick view
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] md:max-w-[700px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto">
                    <div className="py-4 px-3">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                            <ProductDetailsDialogImgs smallImgs={smallImgs} />
                            <div className="md:col-span-7 lg:col-span-8">
                                <div className="flex flex-col gap-3.5 text-[16px]">
                                    <h4 className="uppercase font-semibold">Handbag feugiat</h4>
                                    <p className="text-secondary font-medium">$60.00</p>
                                    <p className="text-accent text-sm leading-[1.6]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia iste laborum ad impedit pariatur esse optio tempora sint ullam autem deleniti nam in quos qui nemo ipsum numquam, reiciendis maiores quidem aperiam, rerum vel recusandae</p>

                                    <div className="flex flex-col gap-2">
                                        <span className="uppercase font-medium">size</span>
                                        <select className="p-2 border focus:outline-none text-sm">
                                            <option>s</option>
                                            <option>m</option>
                                            <option>l</option>
                                            <option>xl</option>
                                            <option>2xl</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="uppercase font-medium">color</span>
                                        <select className="p-2 border focus:outline-none text-sm">
                                            <option>Red</option>
                                            <option>Blue</option>
                                            <option>Green</option>

                                        </select>
                                    </div>
                                    <div className="flex items-center justify-start gap-4">
                                        <input type="number" className="w-[80px] h-[45px] border pl-2 text-sm" value={1} />
                                        <button className="bg-primary cursor-pointer h-[45px] w-[230px] text-white text-xs font-medium transition-colors duration-200 hover:bg-secondary">ADD TO CART</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog >
    )
}
