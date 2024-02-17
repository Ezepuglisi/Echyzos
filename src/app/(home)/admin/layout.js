import Navbar from "@/components/navbar";
import ProtectedRoute from "@/libs/protectedRoute";

export default function RootLayout({ children }) {

        return (
                <ProtectedRoute>
                        <div className='flex flex-col h-screen items-center justify-start'>
                        <Navbar />

                                {children}
                        </div>
                </ProtectedRoute>

        )
}