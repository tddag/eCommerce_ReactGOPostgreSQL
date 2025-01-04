import AddProduct from "../components/AddProduct"
import ProductListAdmin from "../components/ProductListAdmin"


const Admin = () => {
    return (
        <div className="flex flex-col">
            Admin
            <AddProduct/>
            <ProductListAdmin/>
        </div>
        
    )
}

export default Admin