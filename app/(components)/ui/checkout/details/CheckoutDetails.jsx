
export default function CheckoutDetails() {
    const labelStyle = "text-sm capitalize text-accent"
    const inputStyle = "border focus:outline-0 px-4 py-2 text-sm text-accent"
    const divStyle = "flex flex-col gap-2"
    return (
        <div className='space-y-3'>
            <h3 className='bg-primary text-white uppercase font-semibold p-2'>
                billing details
            </h3>

            <form action="#" className='space-y-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className={divStyle}>
                        <label htmlFor="" className={labelStyle}>first name</label>
                        <input type="text" className={inputStyle} />
                    </div>
                    <div className={divStyle}>
                        <label htmlFor="" className={labelStyle}>last name</label>
                        <input type="text" className={inputStyle} />
                    </div>
                </div>

                <div className={divStyle}>
                    <label htmlFor="" className={labelStyle}>email</label>
                    <input type="email" className={inputStyle} />
                </div>
                <div className={divStyle}>
                    <label htmlFor="" className={labelStyle}>phone</label>
                    <input type="number" className={inputStyle} />
                </div>
                <div className={divStyle}>
                    <label htmlFor="" className={labelStyle}>address</label>
                    <input type="text" className={inputStyle} />
                </div>

                <div className={divStyle}>
                    <label htmlFor="" className={labelStyle}>any notes</label>
                    <textarea className={inputStyle} />
                </div>
            </form>
        </div>
    )
}
