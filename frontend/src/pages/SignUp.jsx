import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import { BsLightningChargeFill } from "react-icons/bs";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-50 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <BsLightningChargeFill className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold text-slate-900">InterviewAI</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
            Create Account
          </h1>
          <p className="text-center text-slate-600 mb-8">
            Join thousands preparing for their next interview
          </p>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={form.email}
              className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              className="w-full border-2 border-slate-200 rounded-lg p-3 focus:outline-none focus:border-orange-500 transition"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <p className="px-3 text-slate-400 text-sm">or</p>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;