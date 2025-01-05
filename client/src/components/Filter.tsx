import { Input, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store"
import { Product } from "../types/Product"
import { useEffect, useState } from "react"
import { resetFilter, updateFilter } from "../state/products/productsSlice"

type SelectOption = {
    value: string,
    label: string
}[]

const Filter = () => {

    const { filter, productList } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch();

    const [ categoryList, setCategoryList] = useState<SelectOption>([])
    const [ sizeList, setSizeList] = useState<SelectOption>([])
    const [ colorList, setColorList] = useState<SelectOption>([])
    
    useEffect(() => {
        populateCategoryList()
        populateSizeList()
        populateColorList()
    }, [productList])

    const populateCategoryList = () => {
        if (!productList) return
        let list = productList.map((product: Product) => product.Category)
        let set = new Set(list);
        list = Array.from(set)
        const newList = list.map(v => ({
            value: v.toLowerCase(),
            label: v.charAt(0).toUpperCase() + v.toLowerCase().slice(1)
        }))
        setCategoryList(newList);
    }

    const populateSizeList = () => {
        if (!productList) return
        let list = productList.map((product: Product) => product.Size)
        let set = new Set(list);
        list = Array.from(set)
        const newList = list.map(v => ({
            value: v.toLowerCase(),
            label: v.charAt(0).toUpperCase() + v.toLowerCase().slice(1)
        }))
        setSizeList(newList);
    }    

    const populateColorList = () => {
        if (!productList) return
        let list = productList.map((product: Product) => product.Color)
        let set = new Set(list);
        list = Array.from(set)
        const newList = list.map(v => ({
            value: v.toLowerCase(),
            label: v.charAt(0).toUpperCase() + v.toLowerCase().slice(1)
        }))
        setColorList(newList);
    }    

    return (
        <div className="border-r-2">

            <div className="p-4 flex flex-col gap-2">
                Name
                <Input value={filter.Name}
                    onChange={(e) => dispatch(updateFilter({key: "Name", value: e.target.value}))}                
                />

            </div>

            <div className="p-4 flex flex-col gap-2">
                Category
                <Select className="w-20" value={filter.Category} options={categoryList}
                    onChange={(value) => dispatch(updateFilter({key: "Category", value}))}
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                Size
                <Select className="w-20" value={filter.Size} options={sizeList}
                    onChange={(value) => dispatch(updateFilter({key: "Size", value}))}
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                Color
                <Select className="w-20" value={filter.Color} options={colorList}
                    onChange={(value) => dispatch(updateFilter({key: "Color", value}))}                
                />
            </div>

            <div className="flex w-full justify-center">
                <button className="bg-blue-100 p-2 mt-4 rounded-lg"
                    onClick={() => dispatch(resetFilter())}
                >Reset</button>
            </div>
        </div>
    )
}

export default Filter