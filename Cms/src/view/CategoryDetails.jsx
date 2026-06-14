import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../components/Card";

export default function CategoryDetails()
{
    const [categoryDetails, setCategoryDetails] = useState({})
    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    async function query() {
        try {
            let {data} = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/products/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            console.log(data.data); 
            setCategoryDetails(data.data)

        } catch (error) {
            console.log(error.response);
        }finally{
            setLoading(false)
        }
    }
    
    async function deleteCategories() {
        try {
            let {data} = await axios.delete(`https://api.p2.gc01aio.foxhub.space/apis/products/categories/${id}`, {
                    headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
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
            </div>) :(
            <div className="min-h-screen bg-base-100 px-4 py-10">
                <div className="max-w-7xl mx-auto space-y-10">

                    {/* Category Info Card */}
                    <div className="card bg-base-100 shadow-xl">
                    <div className="card-body flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div>
                        <h2 className="text-3xl font-bold">{categoryDetails.name}</h2>
                        <p className="opacity-70 mt-2">
                            Total Products: {categoryDetails.products?.length || 0}
                        </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                        <a
                            href={`/categories/edit/${id}`}
                            className="btn btn-warning btn-sm"
                        >
                            Edit
                        </a>

                        <button
                            onClick={deleteCategories}
                            className="btn btn-error btn-sm"
                        >
                            Delete
                        </button>

                        <a href="/categories" className="btn btn-ghost btn-sm">
                            Back
                        </a>
                        </div>

                    </div>
                    </div>

                    {/* Products Section */}
                    <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Products in this Category
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryDetails.products?.map((product) => (
                        <Card key={product.id} product={product} />
                        ))}
                    </div>
                    </div>

                </div>
                </div>)}
        </>
    )
}