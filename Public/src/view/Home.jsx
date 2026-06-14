import { useEffect, useState } from "react"
import Card from "../components/Card"
import axios, { all } from "axios"

export default function Home(){
    const [product,setProduct] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const pages = generatePages()

    async function query()
    {
        try {
            let {data} = await axios.get(`https://api.p2.gc01aio.foxhub.space/apis/pub/products/products?limit=12&q=${search}&page=${currentPage}`)
            setProduct(data.data)
            setCurrentPage(data.meta.page)
            setTotalPage(data.meta.totalPages)
        } catch (error) {
            console.log(error);
        }
    }

    

    function handleSearch(e) {
        e.preventDefault()
        query()
    }

    function generatePages() {
        const array = []
        for (let i = 1; i <= totalPage; i++) {
            array.push(i)
        }

        return array
    }

    function handlePages(page) {
        setCurrentPage(page)
    }

    function handlePrevious() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function handleNext() {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        query()
    },[])
    
    {
        return(
            <>
            <form
                className="max-w-md mx-auto"
                onSubmit={handleSearch}
                >
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                    >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a6 6 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754zM10.5 6a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z"
                        clipRule="evenodd"
                    />
                    </svg>
            
                    <input
                    type="text"
                    className="grow"
                    placeholder="Search products..."
                    onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
            </form>

            <div className="min-h-screen bg-base-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {product.map((item) => (
                        <Card key={item.id} product={item} />
                    ))}
                    </div>

                </div>
            </div>
            
            <nav className="flex items-center justify-center gap-x-1">
                <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handlePrevious}
                    disabled={currentPage <= 1 ? true : false}
                >
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="{2}"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Prev</span>
                </button>

                <div className="flex items-center gap-x-1">
                    {pages.map((page) => {
                        return (
                            <div key={page}>
                                <button
                                    type="button"
                                    className={page === currentPage ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-purple-400 py-2 px-3 text-sm border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm"}
                                    onClick={() => handlePages(page)}
                                >
                                    {page}
                                </button>
                            </div>
                        )
                    })}
                </div>

                <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handleNext}
                    disabled={currentPage >= totalPage ? true : false}
                >
                    <span>Next</span>
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="{2}"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </nav>
            </>
        )
    }        
}
        