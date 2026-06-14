import { useState } from "react";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router"
import Toastify from 'toastify-js'

export default function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()


  if(localStorage.access_token)
  {
    return <Navigate to ="/"/>
  }
    async function query(e) {
      try {
        e.preventDefault()
        let {data} = await axios.post("https://api.p2.gc01aio.foxhub.space/apis/auth/login", {email,password})
        localStorage.setItem("access_token", data.data.token)
        navigate("/")
        Toastify({
                text: "Login success",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#34D399",
                    color: "#000000"
                },
            }).showToast();
      } catch (error) {
        Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "#000000"
                }
            }).showToast();
      }
    }

    return (

            <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
            <div className="card w-full max-w-sm bg-base-200 shadow-xl">
              <div className="card-body">
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <form onSubmit={query} className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
    )
}
