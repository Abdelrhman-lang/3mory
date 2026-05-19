
import { getUserOrders } from '@/services/orders/getUserOrders';
import UserAccountClient from './UserAccountClient'
import { getUser } from '@/services/user/getUser'
import { currentUser } from "@clerk/nextjs/server"
export default async function page() {

    const clerkUser = await currentUser()
    const userEmail = clerkUser?.primaryEmailAddress?.emailAddress;
    const user = await getUser(userEmail);
    const userOrders = await getUserOrders(userEmail)

    return (
        <UserAccountClient user={user} userOrders={userOrders} />
    )
}
