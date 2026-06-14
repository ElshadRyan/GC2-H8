import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router"
import Toastify from 'toastify-js'
import ProductForm from "../components/ProductForm"

export default function AddProduct()
{
    
    const navigate = useNavigate()

    

    async function queryPost(e, form) {
        try {
            e.preventDefault()
            let {data} = await axios.post("https://api.p2.gc01aio.foxhub.space/apis/products/products", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
            navigate("/")
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#34D399",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        }
    }

    return(
        <>
                <ProductForm name={"Add Product"} queryPost={queryPost}/>
        </>
    )
}