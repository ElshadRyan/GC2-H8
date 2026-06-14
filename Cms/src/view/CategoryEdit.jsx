import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Toastify from 'toastify-js'

export default function CategoryEdit(){
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
            setName(data.data.name)

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

    async function queryPut(e) {
        e.preventDefault()
        try {
            let {data} = await axios.put(`https://api.p2.gc01aio.foxhub.space/apis/products/categories/${id}`, {name}, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            navigate(`/categories`)
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