import { useEffect } from "react"
import { useState } from "react"
import {useNavigate, useParams} from "react-router"
import axios from 'axios'
import ProductForm from "../components/ProductForm"

export default function EditProduct()
{
    const {id} = useParams()
    const [product, setProduct] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    async function query() {
        try {
            let productData = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/products/products/${id}`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
            setProduct(productData.data.data)
            
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }

    async function queryPost(e, form) {
        e.preventDefault()
        try {
            let {data} = await axios.put(`https://api.p2.gc01aio.foxhub.space/apis/products/products/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
            navigate(`/details/${id}`)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        query()
    }, [])

    return(
         <>
         {loading ? (<div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-sm opacity-70">Loading, please wait...</p>
            </div>) : (<div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
                <ProductForm name={"Edit Product"} queryPost={queryPost} product={product}/>
            </div>)}
        </>
    )
}