import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { BsPlus, BsArrowRight, BsLightningChargeFill } from "react-icons/bs";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        questions: [],
      });
      navigate(`/interview/${res.data.session._id}`);
      setRole("");
      setExperience("");
      fetchSessions();
    } catch (error) {
      console.log("Session creation error:", error.response?.data || error.message);
      alert("Failed to create session: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BsLightningChargeFill className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-slate-900">Interview Sessions</h1>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-slate-600 hover:text-slate-900 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Create Session Card */}
        <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Session</h2>
          <div className="grid md:grid-cols-12 gap-4">
            <input
              placeholder="e.g., Frontend Developer"
              value={role}
              className="md:col-span-5 border-2 border-slate-200 p-3 rounded-lg focus:outline-none focus:border-orange-500 transition"
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              type="number"
              placeholder="e.g., 2 years"
              value={experience}
              className="md:col-span-3 border-2 border-slate-200 p-3 rounded-lg focus:outline-none focus:border-orange-500 transition"
              onChange={(e) => setExperience(e.target.value)}
            />
            <button
              onClick={createSession}
              disabled={loading}
              className="md:col-span-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <BsPlus className="w-5 h-5" />
              {loading ? "Creating..." : "Create Session"}
            </button>
          </div>
        </div>

        {/* Sessions Grid */}
        {sessions.length === 0 ? (
          <div className="text-center py-20">
            <BsLightningChargeFill className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <p className="text-2xl font-bold text-slate-900 mb-2">No sessions yet</p>
            <p className="text-slate-600 mb-6">Create your first session to start practicing</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <div
                key={s._id}
                onClick={() => navigate(`/interview/${s._id}`)}
                className="bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-xl transition cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{s.role}</h3>
                    <p className="text-slate-600 text-sm mt-1">{s.experience} years experience</p>
                  </div>
                  <BsArrowRight className="w-6 h-6 text-orange-500 group-hover:translate-x-1 transition" />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500">
                    {s.questions?.length || 0} questions
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;