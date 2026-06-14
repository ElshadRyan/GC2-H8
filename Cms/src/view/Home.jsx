import { useEffect, useState } from "react"
import Card from "../components/Card"
import axios from "axios"

export default function Home(){
    const [product,setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    async function query()
    {
        try {
            let {data} = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/products/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
            setProduct(data.data)
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        query()
    },[])
    
    {
        return(
            <>

            {loading ? (<div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-sm opacity-70">Loading, please wait...</p>
            </div>) : (<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {product.map((item) => (
                    <Card key={item.id} product={item} />
                    ))}
                </div>
            </div>)} 
            
        </>
        )
    }        
}
        