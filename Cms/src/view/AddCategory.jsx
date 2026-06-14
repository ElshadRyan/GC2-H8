import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";
import Toastify from "toastify-js"

export default function AddCategory()
{
    const [name, setName] = useState('')
    const navigate = useNavigate()

    async function query(e) {
        e.preventDefault()
        try {
            let {data} = await axios.post(`https://api.p2.gc01aio.foxhub.space/apis/products/categories`, {name}, {
                    headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
                navigate("/categories")
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
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
            <form
                onSubmit={query}
                className="card w-full max-w-md bg-base-200 shadow-xl p-6 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Add Category</h2>

                {/* Category Name */}
                <div>
                <label className="label">
                    <span className="label-text">Category Name</span>
                </label>

                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter category name"
                    onChange={(e) => setName(e.target.value)}
                />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full">
                Create Category
                </button>
            </form>
        </div>
    </>
    )
}