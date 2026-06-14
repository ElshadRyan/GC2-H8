import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function Detail()
{
    const {id} = useParams()
    const [currProduct, setCurrProduct] = useState('')

    async function query() {
        try {
            let {data} = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/pub/products/products/${id}`)
            setCurrProduct(data.data) 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        query()
    },[])

    return(
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-10">

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
                <div className="card-body lg:w-1/2">
                <h2 className="card-title text-2xl">
                    {currProduct.name}
                </h2>

                <p className="opacity-70">
                    {currProduct.description}
                </p>

                {/* Actions */}
                <div className="card-actions justify-end mt-6">
                    <a href="/" className="btn btn-primary">
                    Back
                    </a>
                </div>
                </div>

            </div>

        </div>
    )
}