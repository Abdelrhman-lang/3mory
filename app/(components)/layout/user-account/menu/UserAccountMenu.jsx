
import SecondartBtn from '../../../ui/secondary-btn/SecondartBtn'

const menu = [
    { id: 1, title: "account details", value: "accountDetails" },
    { id: 2, title: "orders", value: "orders" },
]
export default function UserAccountMenu({ activeBtn, setActiveBtn }) {

    return (
        <div>
            <ul className='flex flex-col gap-5'>
                {menu.map((m) => {
                    return (
                        <li key={m.id}>
                            <SecondartBtn title={m.title} className={`${activeBtn === m.value ? "bg-secondary!" : ""} w-full p-4 text-start! capitalize! rounded-[3px] text-[14px]`} onClick={() => setActiveBtn(m.value)} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
