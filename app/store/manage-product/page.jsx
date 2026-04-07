"use client"

import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Loading from "@/components/Loading"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { Pencil, Trash2 } from "lucide-react"
import EditProduct from "@/components/EditProduct"

export default function StoreManageProducts() {
    const { getToken } = useAuth()
    const { user } = useUser()

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$"

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const [showEditProduct, setShowEditProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const fetchProducts = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get("/api/store/product", {headers: { Authorization: `Bearer ${token}` },})
            const sortedProducts = (data.products || []).sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
            setProducts(sortedProducts)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleStock = async (productId) => {
        try {
            const token = await getToken()
            const { data } = await axios.post(
                "/api/store/stock-toggle",
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId
                        ? { ...product, inStock: !product.inStock }
                        : product
                )
            )

            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    const deleteProduct = async (id) => {
        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete this product?"
            )
            if (!confirmDelete) return

            const token = await getToken()
            await axios.delete(`/api/store/product?id=${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            await fetchProducts()
            toast.success("Product deleted successfully")
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        }
    }

    const openEditModal = (product) => {
        setSelectedProduct(product)
        setShowEditProduct(true)
    }

    useEffect(() => {
        if (user) {
            fetchProducts()
        }

    }, [user])

    if (loading) return <Loading />

    return (
        <>
            <h1 className="text-2xl text-slate-500 mb-5">
                Manage <span className="text-slate-800 font-medium">Products</span>
            </h1>

            <table className="w-full max-w-6xl text-left ring ring-slate-200 rounded overflow-hidden text-sm">
                <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Actual Price</th>
                        <th className="px-4 py-3">Offer Price</th>
                        <th className="px-4 py-3">Actions</th>
                        <th className="px-4 py-3">Edit</th>
                        <th className="px-4 py-3">Delete</th>
                    </tr>
                </thead>

                <tbody className="text-slate-700">
                    {products.map((product) => (
                        <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 max-w-[150px] sm:max-w-[200px]">
                                <div className="flex gap-2 items-center min-w-0">
                                    <Image
                                        width={40}
                                        height={40}
                                        className="p-1 shadow rounded cursor-pointer object-cover"
                                        src={product.images?.[0] || "/placeholder.png"}
                                        alt={product.name}
                                    />
                                    <span className="truncate text-slate-600 ">
                                        {product.name}
                                    </span>
                                </div>
                            </td>

                            <td className="px-4 py-2 max-w-[150px] sm:max-w-[350px] text-slate-600 truncate">
                                {product.description}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                                {currency}{" "}
                                {(product.actualPrice ?? product.mrp ?? 0).toLocaleString()}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap">
                                {currency}{" "}
                                {(product.offerPrice ?? product.price ?? 0).toLocaleString()}
                            </td>

                            <td className="px-4 py-3 text-center">
                                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        onChange={() =>
                                            toast.promise(toggleStock(product.id), {
                                                loading: "Updating data...",
                                            })
                                        }
                                        checked={product.inStock}
                                    />
                                    <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-orange-600 transition-colors duration-200"></div>
                                    <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                                </label>
                            </td>

                            <td className="px-4 py-3">
                                <button
                                    className="flex items-center gap-1 text-slate-600 mt-1"
                                    onClick={() => openEditModal(product)}
                                >
                                    <Pencil size={18} />
                                </button>
                            </td>

                            <td className="py-4 px-3 text-slate-800 text-center">
                                <Trash2
                                    onClick={() =>
                                        toast.promise(deleteProduct(product.id), {
                                            loading: "Deleting product...",
                                        })
                                    }
                                    className="text-red-500 hover:text-red-800 cursor-pointer mx-auto"
                                    size={18}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditProduct && selectedProduct && (
                <EditProduct
                    product={selectedProduct}
                    setShowEditProduct={setShowEditProduct}
                    setProducts={setProducts}
                />
            )}
        </>
    )
}