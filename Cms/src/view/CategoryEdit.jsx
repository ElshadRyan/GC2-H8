import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function CategoryEdit(){
    const [categoryToEdit, setCategoryToEdit] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
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
            setCategoryToEdit(data.data)
            setName(data.data.name)

        } catch (error) {
            console.log(error.response);
        }finally{
            setLoading(false)
        }
    }

    async function queryPut(e) {
        e.preventDefault()
        try {
            let {data} = await axios.put(`https://api.p2.gc01aio.foxhub.space/apis/products/categories/${id}`, {name}, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            navigate(`/categories`)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        query()
    }, [])

    return(<>
    {loading ? (<div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-sm opacity-70">Loading, please wait...</p>
            </div>) : (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
            <form
                onSubmit={queryPut}
                className="card w-full max-w-md bg-base-200 shadow-xl p-6 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Edit Category</h2>

                {/* Category Name */}
                <div>
                <label className="label">
                    <span className="label-text">Category Name</span>
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter category name"
                />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full">
                Save Changes
                </button>
            </form>
        </div>)}
    </>)
}