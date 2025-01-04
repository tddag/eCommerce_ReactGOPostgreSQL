import { useState } from "react"
import { Product } from "../types/Product"
import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../storage/firebase"
import { v4 as uuidv4} from 'uuid';


const AddProduct = () => {

    const [formData, setFormData] = useState<Product>({
        Name: "New Product",
        Price: 100,
        Category: "Shirt",
        Color: "Black",
        Size: "M",
        Images: []
    })

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value, files } = e.target
        if (!value) value = "";

        setFormData(d => ({
            ...d,
            [name]: files ? files : value
        }))
    }

    const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {


            let imageUrls: string[] = [];

            if (formData.Images) {
                for (let image of formData.Images) {
                    let fileRef = ref(storage, uuidv4())
                    console.log(typeof image)
                    console.log(image)
                    // @ts-ignore
                    await uploadBytes(fileRef, image).then((snapshot) => {
                        console.log("Upload file successfully")
                        // @ts-ignore
                        let url = `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref._location.bucket}/o/${snapshot.ref._location.path}?alt=media`
                        imageUrls.push(url);
                    })
                }
            }
            console.log("After sending files")
            console.log(imageUrls)     
            formData.Images = imageUrls;       


            let url = `${import.meta.env.VITE_SERVER_URL}/api/products`
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData
                })
            })

            if (res.ok) {
                const newProduct = await res.json();
                console.log("Creata a new product successfully", newProduct)
            }
        } catch (e) {
            console.log("Failed to create a new product", e)
        }

    }

    const labelStyles = "text-grey-700 font-bold mr-10"
    const textInputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    return (
        <div className="w-11/12 md:w-1/2 mx-auto mt-10">
            <form onSubmit={createProduct} className="p-4 shadow-md rounded-md bg-blue-200 flex flex-col">
                <div className="flex items-center p-4">
                    <label htmlFor="Name" className={labelStyles}>Name</label>
                    <input type="text" id="Name" name="Name" className={textInputStyles} onChange={handleFormDataChange}/>
                </div>

                <div className="flex items-center p-4">
                    <label htmlFor="Price" className={labelStyles}>Price</label>
                    <input type="number" id="Price" name="Price" className={textInputStyles} onChange={handleFormDataChange}/>
                </div>

                <div className="flex items-center p-4">
                    <label htmlFor="Category" className={labelStyles}>Category</label>
                    <input type="text" id="Category" name="Category" className={textInputStyles} onChange={handleFormDataChange}/>
                </div>

                <div className="flex items-center p-4">
                    <label htmlFor="Color" className={labelStyles}>Color</label>
                    <input type="text" id="Color" name="Color" className={textInputStyles} onChange={handleFormDataChange}/>
                </div>

                <div className="flex items-center p-4">
                    <label htmlFor="Size" className={labelStyles}>Size</label>
                    <input type="text" id="Size" name="Size" className={textInputStyles} onChange={handleFormDataChange}/>
                </div>

                <div className="flex items-center p-4">
                    <label htmlFor="Images" className={labelStyles}>Upload Image</label>
                    <input type="file" id="Images" name="Images" accept="image/*" multiple onChange={handleFormDataChange}/>
                </div>

                <div className="flex items-center p-4">
                    <button type="submit" className="w-full bg-blue-400 text-white py-2 px-4 rounded-md">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct