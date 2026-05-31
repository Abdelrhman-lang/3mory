import { getProducts } from '@/services/products/getProducts'
import ShopClient from './shop-client/ShopClient'

export default async function page({ searchParams }) {
    const products = await getProducts()
    const params = await searchParams

    // selected Filter
    const selectedBrand = params?.brand
    const selectedCategory = params?.category

    // Filter Depend on Filter
    let filterProducts = [...products]

    if (selectedBrand) {
        filterProducts = products.filter(p => p.brand === selectedBrand)
    }
    if (selectedCategory) {
        filterProducts = filterProducts.filter(p => p.category === selectedCategory)
    }
    return (
        <ShopClient products={filterProducts} allProducts={products} />
    )
}
