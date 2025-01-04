import { useState } from "react";
import { Product } from "../types/Product";
import { Modal } from "antd";


interface ProductListAdminProps {
    productList: Product[],
    getProductList: () => void
}

const ProductListAdmin = ({
    productList,
    getProductList
}: ProductListAdminProps) => {

    const [ isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const emptyProduct: Product = {
        Name: "",
        Price: 0,
        Category: "",
        Color: "",
        Size: "",
        Images: []               
    }    
    const [selectedProduct, setSelectedProduct] = useState<Product>(emptyProduct)


    const handleInitUpdate = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }    


    const handleUpdateDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value, files } = e.target;
        console.log("name: ", name)
        console.log("value: ", value)
        console.log("files: ")
        console.log(files)

        setSelectedProduct(d => ({
            ...d,
            [name]: name == "Price" ? (!value ? 0 : parseFloat(value)) : value
        }))
        console.log(selectedProduct)
    }    

    const handleUpdateProduct = async () => {
        
        try {

            let url = `${import.meta.env.VITE_SERVER_URL}/api/products/${selectedProduct.ID}`

            let res = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedProduct),
            })

            if (res) {
                console.log("Successfully update the product")
                setIsModalOpen(false)
                getProductList()
            } else {
                console.log("Failed to create the product")
            }

        } catch (e) {
            console.log(e)
        }
        

    }    

    const labelStyles = "text-grey-700 font-bold mr-10"
    const textInputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"    

    return (
        <div className="w-11/12 md:w-3/4 m-auto mt-20 p-4">
            {productList.length > 0 ? (
                <div className="flex flex-col gap-6 ">
                    {productList.map((product, id) => (
                        <div key={id} className="flex items-center gap-4"> 
                            {product.Name + " | " + "$" + product.Price + " | " + product.Size}

                            <button className="bg-blue-200 p-2 rounded-lg" onClick={() => handleInitUpdate(product)}>
                                Update
                            </button>

                            <div className="flex gap-4 ml-10 overflow-auto">
                                {product.Images?.map((image, imgIdx) => (
                                    <img key={imgIdx} src={image} className="h-20 inline-block"/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : "No products"}


            <Modal
                open={isModalOpen}
                title={"Update: " + selectedProduct?.Name }
                onCancel={() => {
                    setIsModalOpen(false)
                    setSelectedProduct(emptyProduct)
                }}
                footer={[
                        <div key="cancel" className="inline-block">
                            <button 
                                className="bg-red-200 p-2 rounded-lg"  onClick={() => setIsModalOpen(false)}>Cancel
                            </button>
                        </div>,
                        <div key="update" className="inline-block ml-3">
                            <button 
                                className="bg-green-200 p-2 rounded-lg" onClick={handleUpdateProduct} >Update
                            </button>
                        </div>
                ]}
            >
                <div>
                    <div className="flex items-center p-4">
                        <label htmlFor="Name" className={labelStyles}>Name:  </label>                        
                        <input type="text" id="Name" name="Name" value={selectedProduct?.Name} onChange={handleUpdateDataChange} className={textInputStyles}/>
                    </div>

                    <div className="flex items-center p-4">
                        <label htmlFor="Price" className={labelStyles}>Price:  </label>                        
                        <input type="number" id="Price" name="Price" value={selectedProduct?.Price} onChange={handleUpdateDataChange} className={textInputStyles}/>
                    </div>        

                    <div className="flex items-center p-4">
                        <label htmlFor="Category" className={labelStyles}>Category:  </label>                        
                        <input type="text" id="Category" name="Category" value={selectedProduct?.Category} onChange={handleUpdateDataChange} className={textInputStyles}/>
                    </div>           

                    <div className="flex items-center p-4">
                        <label htmlFor="Color" className={labelStyles}>Color:  </label>                        
                        <input type="text" id="Color" name="Color" value={selectedProduct?.Color} onChange={handleUpdateDataChange} className={textInputStyles}/>
                    </div>            

                    <div className="flex items-center p-4">
                        <label htmlFor="Size" className={labelStyles}>Size:  </label>                        
                        <input type="text" id="Size" name="Size" value={selectedProduct?.Size} onChange={handleUpdateDataChange} className={textInputStyles}/>
                    </div>            

                    <div className="flex items-center p-4">
                        <label htmlFor="Images" className={labelStyles}>Upload Image  </label>     
                
                        <input type="file" id="Images" name="Images" accept="image/*" multiple className={textInputStyles}/>

                        {selectedProduct?.Images && (
                            <div className="flex">
                                {selectedProduct.Images.map((image, idx) => 
                                    <div className="h-10 w-10 relative" key={idx}>
                                        <img src={image} alt="prodImg"/>
                                        {/* <span className="absolute -top-3 right-1 text-red-600 cursor-pointer" onClick={() => removeImage(image)}>x</span> */}
                                    </div>
                                )}
                            </div>
                        )}   
                    </div>  
                </div>
                
            </Modal>            
        </div>
    )
}

export default ProductListAdmin;