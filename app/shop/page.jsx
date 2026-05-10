import { getProducts } from '@/services/products/getProducts'
import ShopClient from './shop-client/ShopClient'

export default async function page() {
    const products = await getProducts()
    return (
        <ShopClient products={products} />
    )
}
