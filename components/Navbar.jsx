'use client'
import { PackageIcon, Search, ShoppingCart, Contact, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUser, useClerk, UserButton, Protect, useAuth } from "@clerk/nextjs";
import axios from "axios";

const Navbar = () => {

    const { getToken } = useAuth()
    const { user } = useUser()
    const [isSeller, setIsSeller] = useState(false)
    const { openSignIn } = useClerk()
    const router = useRouter()

    const [search, setSearch] = useState('')
    const [openSearch, setOpenSearch] = useState(false)

    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
        setOpenSearch(false)
    }

    useEffect(() => {
        const checkIsSeller = async () => {
            try {
                const token = await getToken()

                const { data } = await axios.get('/api/store/check-seller', {
                    headers: { Authorization: `Bearer ${token}` }
                })

                setIsSeller(data.isSeller)
            } catch (error) {}
        }

        if (user) {
            checkIsSeller()
        }

    }, [user])

    return (
        <>
            <nav className="relative bg-white z-70">
                <div className="mx-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto py-4">

                        {/* Logo */}
                        <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                            <span className="text-green-600">Cell</span>GenS
                            <span className="text-green-600 text-5xl">.</span>

                            <Protect plan='plus'>
                                <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full text-white bg-green-500">
                                    plus
                                </p>
                            </Protect>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">

                            {isSeller && (
                                <button
                                    onClick={() => router.push('/store')}
                                    className="text-xs border px-4 py-1.5 rounded-full">
                                    Seller Dashboard
                                </button>
                            )}

                            <Link href="/">Home</Link>
                            <Link href="/shop">Shop</Link>
                            <Link href="/store">About</Link>
                            <Link href="/contact">Contact</Link>

                            {/* SEARCH ICON */}
                            <button
                                onClick={() => setOpenSearch(prev => !prev)}
                                className="p-2 hover:bg-gray-100 rounded-full transition">
                                <Search size={18} />
                            </button>

                            {/* CART */}
                            <Link href="/cart" className="relative flex items-center gap-2">
                                <ShoppingCart size={18} />
                                Cart

                                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            </Link>

                            {!user ? (
                                <button
                                    onClick={openSignIn}
                                    className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full">
                                    Login
                                </button>
                            ) : (
                                <UserButton>
                                    <UserButton.MenuItems>

                                        <UserButton.Action
                                            labelIcon={<PackageIcon size={16} />}
                                            label="My Orders"
                                            onClick={() => router.push('/orders')}
                                        />

                                        {isSeller && (
                                            <UserButton.Action
                                                labelIcon={<Store size={16} />}
                                                label="Seller Dashboard"
                                                onClick={() => router.push('/store')}
                                            />
                                        )}

                                        <UserButton.Action
                                            labelIcon={<Contact size={16} />}
                                            label="Contact"
                                            onClick={() => router.push('/contact')}
                                        />

                                    </UserButton.MenuItems>
                                </UserButton>
                            )}

                        </div>

                        {/* Mobile */}
                        <div className="sm:hidden flex items-center gap-3">

                            {/* Search Icon */}
                            <button
                                onClick={() => setOpenSearch(prev => !prev)}
                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition"
                            >
                                <Search size={20} />
                            </button>

                            {user ? (
                                <UserButton />
                            ) : (
                                <button
                                    onClick={openSignIn}
                                    className="px-5 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm text-white rounded-full">
                                    Login
                                </button>
                            )}
                        </div>

                    </div>
                </div>

                <hr className="border-gray-300" />
            </nav>


            {/* SEARCH DROPDOWN */}
            <div
                className={`fixed inset-0 z-[60] transition-all duration-300
                ${openSearch ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >

                {/* Overlay backdrop-blur-sm */}
                <div
                    className="absolute inset-0 bg-black/10 "
                    onClick={() => setOpenSearch(false)}
                />

                {/* Dropdown Panel */}
                <div
                    className={`absolute left-0 top-[80px] w-full bg-white border-t
                    transform transition-all duration-300
                    ${openSearch ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
                    onClick={(e) => e.stopPropagation()}
                >

                    <div className="max-w-4xl mx-auto px-6 py-10">

                        {/* Search Input */}
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-4  pb-3"
                        >

                            <Search size={22} className="text-gray-500" />

                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products on CellGenS"
                                className="w-full text-2xl outline-none"
                            />

                        </form>

                        {/* Quick Links */}
                        <div className="mt-8 text-gray-600">

                            <p className="text-sm mb-4">Quick Links</p>

                            <div className="space-y-3 text-lg">

                                <p
                                    onClick={() => {
                                        setOpenSearch(false)
                                        router.push('/shop')
                                    }}
                                    className="cursor-pointer hover:text-black transition hover:translate-x-1"
                                >
                                    → Shop
                                </p>

                                <p
                                    onClick={() => {
                                        setOpenSearch(false)
                                        router.push('/store')
                                    }}
                                    className="cursor-pointer hover:text-black transition hover:translate-x-1"
                                >
                                    → Store
                                </p>

                                <p
                                    onClick={() => {
                                        setOpenSearch(false)
                                        router.push('/contact')
                                    }}
                                    className="cursor-pointer hover:text-black transition hover:translate-x-1"
                                >
                                    → Contact
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default Navbar
