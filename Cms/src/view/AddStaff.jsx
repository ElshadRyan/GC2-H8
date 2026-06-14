import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router";

export default function AddStaff(){
    const [form, setForm] = useState({
           username: "",
           email: "",
           password: "",
           role: "",
           phoneNumber: "",
           address: "",
       })
    
    const navigate = useNavigate()

    async function query(e) {
        e.preventDefault()
        try {
            let {data} = await axios.post("https://api.p2.gc01aio.foxhub.space/apis/auth/add-user", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }})
            navigate("/")
        } catch (error) {
            console.log(error.response);
        }
    }

    function assigningValue(valueKey, event)
    {
        let value = event.target.value

        setForm((data) => {
            return {
                ...data,
                [valueKey]: value
            }
        })
    }
   
    return(
        <>
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-10">
            <form
                onSubmit={query}
                className="card w-full max-w-lg bg-base-200 shadow-xl p-6 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Add Staff</h2>

                {/* Username */}
                <div>
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter username"
                    className="input input-bordered w-full"
                    onChange={(e) => assigningValue("username", e)}
                />
                </div>

                {/* Email */}
                <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="Enter email"
                    className="input input-bordered w-full"
                    onChange={(e) => assigningValue("email", e)}
                />
                </div>

                {/* Password */}
                <div>
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="Enter password"
                    className="input input-bordered w-full"
                    onChange={(e) => assigningValue("password", e)}
                />
                </div>

                {/* Role */}
                <div>
                <label className="label">
                    <span className="label-text">Role</span>
                </label>

                <select
                    className="select select-bordered w-full"
                    onChange={(e) => assigningValue("role", e)}
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                </select>
                </div>

                {/* Phone Number */}
                <div>
                <label className="label">
                    <span className="label-text">Phone Number</span>
                </label>
                <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="input input-bordered w-full"
                    onChange={(e) => assigningValue("phoneNumber", e)}
                />
                </div>

                {/* Address */}
                <div>
                <label className="label">
                    <span className="label-text">Address</span>
                </label>
                <textarea
                    placeholder="Enter address"
                    className="textarea textarea-bordered w-full"
                    rows={3}
                    onChange={(e) => assigningValue("address", e)}
                />
                </div>

                {/* Submit */}
                <button
                type="submit"
                className="btn btn-primary w-full"
                >
                Add Staff
                </button>
            </form>
        </div>
        </>
    )
}