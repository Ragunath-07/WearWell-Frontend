import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import axios from 'axios'
import { useState } from "react"
import { toast } from 'react-toastify'
import { useNavigate, NavLink } from "react-router-dom"

function SignUp() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleEyeAccess = () => {
    setShowPassword(!showPassword)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error("All fields are required")
      return
    }

    try {
      setLoading(true)
      const res = await createUserWithEmailAndPassword(auth, email, password)

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users`, { name, email, firebaseUid: res.user.uid })

      toast.success("Account created successfully!")
      navigate('/login')
    }
    catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered")
      }
      else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters")
      }
      else {
        toast.error("Failed to create Account")
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center gap-5 h-[100vh]">

      <h1 className='text-3xl font-bold text-black text-center login__title'>Create new account.</h1>

      <div className="relative rounded-3xl bg-[#F4F6FB] py-5 mt-5 w-80 sm:w-96">
        <input type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="outline-none bg-transparent px-5 font-semibold w-full"
          required />
        <i className="absolute right-5 ri-id-card-fill" />
      </div>

      <div className="relative rounded-3xl bg-[#F4F6FB] py-5 w-80 sm:w-96">
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

      <button type="submit" className="text-white bg-blue-500 w-80 sm:w-96 py-6 rounded-full mt-5">{loading ? "Creating account..." : "Sign Up"}</button>

      <div className="flex gap-1">
        <p className="text-center text-sm">Already have an account?</p>
        <NavLink to={'/login'} className={`text-sm font-semibold text-blue-500`}>Log in</NavLink>
      </div>

    </form>
  )
}

export default SignUp