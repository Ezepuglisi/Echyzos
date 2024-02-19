import Navbar from "@/components/navbar";
import ProtectedRoute from "@/libs/protectedRoute";
import Link from "next/link";

export default function RootLayout({ children }) {

        return (
                <ProtectedRoute>
                        <div className='flex flex-col h-screen items-center justify-start'>
                        {/* <Navbar /> */}

                        <div className="w-full flex bg-white shadow-md justify-center items-center gap-8 p-2">
                                <Link href={'/admin/view-products'}>Ver disfraces</Link>
                                <Link href={'/admin/add-product'}>Agregar un disfraz</Link>
                        </div>

                                {children}
                        </div>
                </ProtectedRoute>

        )
}