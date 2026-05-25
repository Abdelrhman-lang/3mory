



export default function CheckoutDetails({ formData,  handelInputChange}) {
    const labelStyle = "text-sm capitalize text-accent"
    const inputStyle = "border focus:outline-0 px-4 py-2 text-sm text-accent"
    const divStyle = "flex flex-col gap-2"

    return (
        <div className='space-y-3'>
            <h3 className='bg-primary text-white uppercase font-semibold p-2'>
                billing details
            </h3>

            <form className='space-y-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className={divStyle}>
                        <label htmlFor="firstName" className={labelStyle}>first name</label>
                        <input type="text" className={inputStyle} name="firstName" value={formData.firstName} onChange={handelInputChange} required disabled />
                    </div>
                    <div className={divStyle}>
                        <label htmlFor="lastName" className={labelStyle}>last name</label>
                        <input type="text" className={inputStyle} name="lastName" value={formData.lastName} onChange={handelInputChange} required />
                    </div>
                </div>

                <div className={divStyle}>
                    <label htmlFor="email" className={labelStyle}>email</label>
                    <input type="email" className={inputStyle} name="email" value={formData.email} onChange={handelInputChange} required disabled />
                </div>
                <div className={divStyle}>
                    <label htmlFor="phoneNumber" className={labelStyle}>phone</label>
                    <input type="number" className={inputStyle} name="phoneNumber" value={formData.phoneNumber} onChange={handelInputChange} required />
                </div>
                <div className={divStyle}>
                    <label htmlFor="address" className={labelStyle}>address</label>
                    <input type="text" className={inputStyle} name="address" value={formData.address} onChange={handelInputChange} required />
                </div>

                <div className={divStyle}>
                    <label htmlFor="note" className={labelStyle}>any notes</label>
                    <textarea className={inputStyle} name="note" value={formData.note} onChange={handelInputChange}/>
                </div>
            </form>
        </div>
    )
}
