import { useNavigate } from "react-router-dom";
import { BsLightningChargeFill, BsGear, BsBook } from "react-icons/bs";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-50 to-slate-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <BsLightningChargeFill className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold text-slate-900">InterviewAI</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-slate-900 font-medium hover:text-orange-500 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Master Interviews with{" "}
              <span className="text-orange-500">AI-Powered</span> Prep
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Get unlimited practice questions, AI-generated solutions, and personalized interview coaching — all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border-2 border-slate-900 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-900 hover:text-white transition"
              >
                Login
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl shadow-2xl flex items-center justify-center">
              <BsLightningChargeFill className="w-40 h-40 text-white opacity-50" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BsLightningChargeFill,
              title: "AI-Generated Questions",
              desc: "Get unlimited interview questions tailored to your role and experience level",
            },
            {
              icon: BsBook,
              title: "Smart Explanations",
              desc: "Understand concepts deeply with AI-powered explanations and real-world examples",
            },
            {
              icon: BsGear,
              title: "Personalized Sessions",
              desc: "Create focused sessions by role, topic, and experience to maximize learning",
            },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-slate-100">
              <feature.icon className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-center py-16 mt-20">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to ace your next interview?</h2>
        <p className="text-slate-300 mb-8 text-lg">Join thousands of candidates preparing smarter</p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default LandingPage;