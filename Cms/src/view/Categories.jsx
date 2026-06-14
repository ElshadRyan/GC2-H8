import axios from "axios"
import { useEffect, useState } from "react"
import Toastify from "toastify-js"

export default function Categories(){
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    async function query() {
        try {
            let {data} = await axios.get("https://api.p2.gc01aio.foxhub.space/apis/products/categories", {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setCategories(data.data)
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
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        query()
    },[])

    return(
        <>
        {loading ? (<div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-sm opacity-70">Loading, please wait...</p>
            </div>) : (
        <div className="min-h-screen bg-base-100 px-4 py-10">
  
            {/* Header */}
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Categories</h1>

                <a href="/addCategory" className="btn btn-primary">
                Add Category
                </a>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                <div
                    key={category.id}
                    className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-2xl"
                >
                    <div className="card-body">
                    <h2 className="card-title">{category.name}</h2>

                    <div className="card-actions justify-end mt-4">
                        <a
                        href={`/categories/${category.id}`}
                        className="btn btn-primary btn-sm"
                        >
                        Details
                        </a>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>)}
        </>
    )

}