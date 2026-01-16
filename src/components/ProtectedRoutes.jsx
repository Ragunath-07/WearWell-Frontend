import { Navigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify"

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            toast.error("Authentication needed kindly Log in")
        }
    }, [user])

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return children
}
    
export default ProtectedRoute