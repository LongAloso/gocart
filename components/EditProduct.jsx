"use client"

import { assets } from "@/assets/assets"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const EditProduct = ({ product, setShowEditProduct, setProducts }) => {

    const categories = [
        'Electronics','Clothing','Home & Kitchen','Beauty & Health',
        'Toys & Games','Sports & Outdoors','Books & Media',
        'Food & Drink','Hobbies & Crafts','Others'
    ]

    const { getToken } = useAuth()

    const [loading, setLoading] = useState(false)

    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: "",
        price: "",
        category: "",
    })

    const [images, setImages] = useState([null, null, null, null])

    useEffect(() => {
        if (!product) return

        setProductInfo({
            name: product.name || "",
            description: product.description || "",
            mrp: product.mrp ?? "",
            price: product.price ?? "",
            category: product.category || "",
        })

        const nextImages = [null, null, null, null]
        ;(product.images || []).slice(0, 4).forEach((img, index) => {
            nextImages[index] = img
        })

        setImages(nextImages)
    }, [product])

    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const handleImageChange = (index, file) => {
        setImages(prev => {
            const next = [...prev]
            next[index] = file
            return next
        })
    }

    const removeImage = (index) => {
        setImages(prev => {
            const next = [...prev]
            next[index] = null
            return next
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!product?.id) {
            return toast.error("Product ID missing")
        }

        try {
            setLoading(true)

            const formData = new FormData()

            formData.append("name", productInfo.name)
            formData.append("description", productInfo.description)
            formData.append("mrp", productInfo.mrp)
            formData.append("price", productInfo.price)
            formData.append("category", productInfo.category)

            images.forEach((img) => {
                if (img instanceof File) {
                    formData.append("images", img)
                } else if (typeof img === "string") {
                    formData.append("existingImages", img)
                }
            })

            const token = await getToken()

            const { data } = await axios.put(
                `/api/store/product/${product.id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )

            toast.success(data.message)

            setProducts(prev =>
                prev.map(p => p.id === product.id ? data.product : p)
            )

            setShowEditProduct(false)

        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={onSubmitHandler}className="bg-white flex flex-col gap-4 text-slate-700 w-full max-w-2xl p-8 rounded-lg shadow-xl relative max-h-[95vh] overflow-y-auto">

                <h2 className="text-2xl font-semibold">
                    Edit <span className="text-slate-500">Product</span>
                </h2>

                {/* IMAGE */}
                <p className="text-sm">Product Images</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((img, index) => {

                        const preview =
                            img instanceof File
                                ? URL.createObjectURL(img)
                                : img || assets.upload_area

                        return (
                            <div key={index} className="relative">
                                <label htmlFor={`edit-images-${index}`}>
                                    <div className="h-24 w-full border border-slate-200 rounded cursor-pointer overflow-hidden flex items-center justify-center bg-slate-100">
                                        <Image
                                            width={300}
                                            height={300}
                                            src={preview}
                                            alt=""
                                            className="h-25 w-auto rounded cursor-pointer"
                                        />
                                    </div>
                                </label>

                            
                                {img && (
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                                    >
                                        ✕
                                    </button>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    id={`edit-images-${index}`}
                                    hidden
                                    onChange={(e) =>
                                        handleImageChange(index, e.target.files?.[0] || null)
                                    }
                                />
                            </div>
                        )
                    })}
                </div>

                {/* NAME */}
                <input
                    type="text"
                    name="name"
                    value={productInfo.name}
                    onChange={onChangeHandler}
                    className="p-2 border border-slate-200 rounded"
                    placeholder="Name"
                    required
                />

                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    value={productInfo.description}
                    onChange={onChangeHandler}
                    rows={4}
                    className="p-2 border border-slate-200 rounded"
                    placeholder="Description"
                    required
                />

                {/* PRICE */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="mrp"
                        value={productInfo.mrp}
                        onChange={onChangeHandler}
                        placeholder="Actual Price"
                        className="p-2 border border-slate-200 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={productInfo.price}
                        onChange={onChangeHandler}
                        placeholder="Offer Price"
                        className="p-2 border border-slate-200 rounded"
                        required
                    />
                </div>

                {/* CATEGORY */}
                <select
                    value={productInfo.category}
                    onChange={(e) =>
                        setProductInfo({ ...productInfo, category: e.target.value })
                    }
                    className="p-2 border border-slate-200 rounded"
                    required
                >
                    <option className="border border-slate-800" value="" >Select category</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <button disabled={loading}className="bg-slate-800 text-white py-3 rounded">
                    {loading ? "SAVING..." : "SAVE CHANGES"}
                </button>

                <X size={24}className="absolute top-4 right-4 cursor-pointer"onClick={() => setShowEditProduct(false)}/>
            </form>
        </div>
    )
}

export default EditProduct