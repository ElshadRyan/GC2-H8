import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Toastify from 'toastify-js'

export default function ProductForm({name, queryPost, product})
{
    const [allCategory, allCategories] = useState([])
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imgUrl: "",
        categoryId: 0,
    })
    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imgUrl: product.imgUrl,
                categoryId: product.categoryId
            })
        }
    }, [product])

    async function query() {
        try {
            let {data} = await axios.get("https://api.p2.gc01aio.foxhub.space/apis/products/categories", {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
            allCategories(data.data)
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

    function assigningValue(valueKey, event)
    {
        let value = event.target.value
        if(valueKey === "price" || valueKey === "stock" || valueKey === "categoryId")
        {
            value = +value
        }

        setForm((data) => {
            return {
                ...data,
                [valueKey]: value
            }
        })
    }

    useEffect(() => {
        
        query()
    }, [])
    return(
            <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
         <form
                    onSubmit={(e) => queryPost(e, form)}
                    className="card w-full max-w-lg bg-base-200 shadow-xl p-6 space-y-4"
                >
                    <h2 className="text-2xl font-bold text-center">{name}</h2>

                    {/* Name */}
                    <div>
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Input name"
                        className="input input-bordered w-full"
                        value={form.name}
                        onChange={(e) => assigningValue("name", e)}
                    />
                    </div>

                    {/* Description */}
                    <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Description"
                        className="input input-bordered w-full"
                        value={form.description}
                        onChange={(e) => assigningValue("description", e)}
                    />
                    </div>

                    {/* Price */}
                    <div>
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Input price"
                        className="input input-bordered w-full"
                        value={form.price}
                        onChange={(e) => assigningValue("price", e)}
                    />
                    </div>

                    {/* Stock */}
                    <div>
                    <label className="label">
                        <span className="label-text">Stock</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Input stock"
                        className="input input-bordered w-full"
                        value={form.stock}
                        onChange={(e) => assigningValue("stock", e)}
                    />
                    </div>

                    {/* Image URL */}
                    <div>
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Input URL"
                        className="input input-bordered w-full"
                        value={form.imgUrl}
                        onChange={(e) => assigningValue("imgUrl", e)}
                    />
                    </div>

                    {/* Category */}
                    <div>
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>

                    <select
                        className="select select-bordered w-full"
                        onChange={(e) => assigningValue("categoryId", e)}
                        value={form.categoryId}
                    >
                        {allCategory.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                        ))}
                    </select>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-full mt-4">
                    {name}
                    </button>
                </form>
                </div>
    )
}