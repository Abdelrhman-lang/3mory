import SecondartBtn from '@/app/(components)/ui/secondary-btn/SecondartBtn'
import Link from 'next/link'


export default function CartBtns({ fn }) {
    return (
        <div className="py-5 flex flex-col gap-2">
            <SecondartBtn title={"place order"} className={"w-full py-3"} onClick={fn} />
            <Link href={"/cart"}>
                <SecondartBtn title={"view cart"} className={"w-full py-3 bg-[#f1f1f1]! text-primary! tracking-widest"} />
            </Link>
        </div>
    )
}
