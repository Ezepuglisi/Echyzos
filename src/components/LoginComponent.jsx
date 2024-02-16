"use client"
import { userStore } from "@/libs/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginComponent = () => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState("")

    const router = useRouter()
    const {login} = userStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('loguetate')

        if(password === "" || user === "") return 

        login({user})
        router.push('/admin')
    }

    return (
        <div className="bg-green-50/25 flex justify-center items-center h-screen">
            {/* 
            <!-- Left: Image -->            
            */}
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="/banner.jpg" alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            {/*<!-- Right: Login Form --> */}
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Bienvenido/a nuevamente</h1>
                <form action="submit" onSubmit={handleSubmit}>
                    {/* 
                    <!-- Username Input -->
                    */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Usuario</label>
                        <input type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500" value={user} onChange={(e)=> setUser(e.target.value)} />
                    </div>
                    {/*
                    <!-- Password Input -->
                    */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Contraseña</label>
                        <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-green-500" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    {/*<!-- Login Button -->*/}
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md py-2 px-4 w-full">Iniciar sesión</button>
                </form>
                {/* <!-- Sign up  Link -->*/}
                <div className="mt-6 text-center flex gap-2">
                    <p>¿No tienes una cuenta?</p>
                    <Link href="#" className="hover:underline text-green-500">Registrate aquí</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent