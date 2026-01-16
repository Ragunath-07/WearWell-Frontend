import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { NavLink, useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleEyeAccess = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("All fields are required")
      return
    }

    try {
      setLoading(true)
      // 1️⃣ Firebase login
      const res = await signInWithEmailAndPassword(auth, email, password)

      // 2️⃣ Sync user with backend
      await axios.post("http://localhost:5000/api/users", {
        email,
        firebaseUid: res.user.uid
      })
      navigate("/")
    }

    catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        toast.error("Email or password is wrong")
        setLoading(false)
      } else {
        toast.error(error.message)
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center gap-5 h-[100vh]">

      <h1 className='text-3xl font-bold text-black text-center login__title'>Log in to your account.</h1>

      <div className="relative rounded-3xl bg-[#F4F6FB] py-5 mt-5 w-80 sm:w-96">
        <input type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none bg-transparent px-5 font-semibold w-full"
          required />
        <i className="absolute right-5 ri-mail-fill" />
      </div>

      <div className="relative rounded-3xl bg-[#F4F6FB] py-5 w-80 sm:w-96">
        <input type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none bg-transparent px-5 font-semibold w-full"
          required />
        <i className={`${showPassword ? "ri-eye-fill" : "ri-eye-off-fill"} absolute right-5 cursor-pointer`} onClick={handleEyeAccess} />
      </div>

      <button type="submit" className="text-white font-medium bg-blue-500 w-80 sm:w-96 py-6 rounded-full mt-5">{loading ? "Logging in..." : "Log in"}</button>

      <div className="flex gap-1">
        <p className="text-center text-sm">If you don't have an account?</p>
        <NavLink to={'/signup'} className={`text-sm font-semibold text-blue-500`}>Sign Up</NavLink>
      </div>

    </form>
  )
}

export default Login