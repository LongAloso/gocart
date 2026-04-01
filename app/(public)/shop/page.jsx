'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon, SearchX } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import BestSelling from "@/components/BestSelling"

 function ShopContent() {

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)

    const filteredProducts = search
        ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    return (
        <div className="min-h-[70vh] mx-6">
            <div className=" max-w-7xl mx-auto">
                <h1 onClick={() => router.push('/shop')} className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"> {search && <MoveLeftIcon size={20} />}  All <span className="text-slate-700 font-medium">Products</span></h1>
                    {filteredProducts.length === 0 ? (
                <div>
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-xl my-10">
                        <SearchX size={48} className="text-slate-300 mb-4" />
                        <h2 className="text-xl text-slate-600 font-medium">No products found matching your search.</h2>
                        <p className="text-slate-400 mt-2">Please try again with a different keyword or return to the shop page.</p>
                        <button 
                            onClick={() => router.push('/shop')}
                            className="mt-6 bg-slate-800 text-white px-6 py-2 rounded-full hover:bg-slate-900 transition"
                        >
                            Back to Shop
                        </button>
                       
                    </div>
                    < BestSelling/>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        <BestSelling/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />

    </Suspense>
  );
}