import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Toastify from 'toastify-js'

export default function Detail()
{
    const {id} = useParams()
    const [currProduct, setCurrProduct] = useState('')
    const [loading, setLoading] = useState(false)

    async function deleteProduct() {
        try {
            let {data} = await axios.delete(`https://api.p2.gc01aio.foxhub.space/apis/products/products/${id}`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
        } catch (error) {
            console.log(error);
        }
    }

    async function query() {
        try {
            let {data} = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/products/products/${id}`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
            setCurrProduct(data.data) 
        } catch (error) {
            console.log(error);
        }
    }

    async function handleUpload(e)
    {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("file", e.target.files[0])

            const { data } = await axios.patch(`https://api.p2.gc01aio.foxhub.space/apis/products/products/${currProduct.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            query()
        } catch (error) {
            console.log(error);

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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        query()
    },[])

    
    if(currProduct === '')
    {    
      return <div>Loading...</div>;
    }

    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-5xl w-full overflow-hidden">
                
                {/* Image */}
                <figure className="lg:w-1/2 bg-base-200">
                <img
                    src={currProduct.imgUrl}
                    alt={currProduct.name}
                    className="w-full h-full object-cover"
                />
                </figure>

                {/* Content */}
                <div className="card-body lg:w-1/2 space-y-2">
                <h2 className="card-title text-2xl">{currProduct.name}</h2>

                <p className="opacity-70">{currProduct.description}</p>

                <div className="space-y-1 mt-2">
                    <p><span className="font-semibold">Price:</span> {currProduct.price}</p>
                    <p><span className="font-semibold">Stock:</span> {currProduct.stock}</p>
                    <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {currProduct.category?.name}
                    </p>
                </div>

                {/* Actions */}
                <div className="card-actions justify-end mt-6 gap-2">
                    <a href="/" className="btn btn-ghost">
                    Back
                    </a>

                    <a href={`/edit/${currProduct.id}`} className="btn btn-warning">
                    Edit
                    </a>

                    {loading ? (
                        <>
                            <img src={loadingGif} className="w-1/6" />
                        </>
                    ) : (
                        <>
                            <label className="fa-solid fa-upload fa-2xl m-5 cursor-pointer">
                                <input type="file" className="hidden" onChange={handleUpload} />
                            </label>
                        </>
                    )}

                    <button
                    onClick={deleteProduct}
                    className="btn btn-error"
                    >
                    Delete
                    </button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}