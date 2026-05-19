import React from 'react'

export default function AccountDetails({ user, userOrders }) {
    const tableHeads = [
        { id: 1, title: "id" },
        { id: 2, title: "first name" },
        { id: 3, title: "last name" },
        { id: 4, title: "email" },
        { id: 5, title: "address" },
        { id: 6, title: "phone" },
        { id: 7, title: "orders" },
    ]
    const tdStyle = "p-2.5 border-r"
    const centerItems = "flex items-center justify-center"
    const textStyle = "text-accent text-sm font-semibold"
    return (
        <div className='w-full'>
            <div className='overflow-x-scroll xl:overflow-hidden'>
                <table className='w-full min-w-[800px]'>
                    <thead className='border bg-[#f2f2f2]'>
                        {tableHeads.map((tb) => {
                            return (
                                <th key={tb.id} className="border-b-4 border-b-secondary text-accent font-semibold uppercase p-2.5 text-center">
                                    {tb.title}
                                </th>
                            )
                        })}
                    </thead>

                    <tbody>
                        <tr className='border-b border-l text-center'>
                            {/* ID */}
                            <td className={tdStyle}>
                                <div className={centerItems}>
                                    <p className={textStyle} onClick={() => console.log(user)}>
                                        {user?.id}
                                    </p>
                                </div>
                            </td>
                            {/* First Name */}
                            <td className={tdStyle}>
                                <div className={centerItems}>
                                    <p className={textStyle} onClick={() => console.log(user)}>
                                        {user?.firstName}
                                    </p>
                                </div>
                            </td>
                            {/* Last Name */}
                            <td className={tdStyle}>
                                <div className={centerItems}>
                                    <p className={textStyle} onClick={() => console.log(user)}>
                                        {user?.lastName}
                                    </p>
                                </div>
                            </td>
                            {/* Email */}
                            <td className={tdStyle}>
                                <div className={centerItems}>
                                    <p className={textStyle} onClick={() => console.log(user)}>
                                        {user?.email}
                                    </p>
                                </div>
                            </td>
                            {/* Address */}
                            <td className={tdStyle}>
                                <div className={centerItems}>
                                    <p className={textStyle} onClick={() => console.log(user)}>
                                        {user?.address}
                                    </p>
                                </div>
                            </td>
                            {/* Phone */}
                            <td className={tdStyle}>
                                <div className={centerItems}>
                                    <p className={textStyle} onClick={() => console.log(user)}>
                                        {user?.phoneNumber}
                                    </p>
                                </div>
                            </td>
                            {/* Orders */}
                            <td className={tdStyle}>
                                <div className={centerItems}>
                                    <p className={textStyle} onClick={() => console.log(user)}>
                                        {userOrders.length}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
