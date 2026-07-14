
import GridControl from '../../shop-page/grid-control/GridControl'
import ShopSort from '../../shop-page/sort/ShopSort'

export default function ShopHeader({ onSortChange, gridOption, setGridOption, products }) {
    return (
        <div>
            <h1 className='font-bold text-4xl mb-5'>Shop</h1>
            <div className='border py-3 lg:p-3 flex flex-col items-center justify-center gap-y-8 lg:flex-row lg:justify-between'>
                <GridControl gridOption={gridOption} setGridOption={setGridOption} />
                <ShopSort onSortChange={onSortChange} />
                <div className='text-accent text-sm'>
                    Showing <span className='text-secondary font-bold'>{products.length}</span> products of <span className='text-secondary font-bold'>{products.length}</span> products
                </div>
            </div>
        </div>
    )
}
