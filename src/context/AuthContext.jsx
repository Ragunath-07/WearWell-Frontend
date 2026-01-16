import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

export const AuthContext = createContext()

export function AuthProvider(props) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unSubscribe()
    }, [])

    const logOut = async () => {
        await signOut(auth)
        setUser(null)
    }

    const value = {
        user, logOut, loading
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}