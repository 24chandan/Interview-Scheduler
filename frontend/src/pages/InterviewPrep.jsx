import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsLightningChargeFill, BsBook } from "react-icons/bs";

import QAItem from "../components/QAItems";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import { API_PATHS } from "../utils/apiPaths";

import axios from "../utils/axiosInstance";

const parseError = (err) => {
  console.log(err);
  if (err.response) {
    const apiError = err.response.data?.error;
    if (typeof apiError === "string") {
      try {
        const parsed = JSON.parse(apiError);
        return (
          parsed?.error?.message ||
          parsed?.message ||
          apiError ||
          err.response.data?.message
        );
      } catch {
        return apiError;
      }
    }

    return (
      err.response.data?.message ||
      err.response.data?.error ||
      `Server error: ${err.response.status}`
    );
  }
  if (err.request) return "Cannot reach server. Check your connection.";
  return err.message || "Something went wrong.";
};

const InterviewPrep = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
      setSessionData(res.data.session);
      setQuestions(res.data.session.questions || []);
    } catch (err) {
      console.log(err.response);
      setFetchError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId: id });
      await fetchQuestions();
      toast.success("Questions generated successfully!");
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster
        position="top-right"
        toastOptions={{ className: "!text-sm !font-medium" }}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <BsArrowLeft className="w-6 h-6 text-slate-900" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <BsBook className="w-6 h-6 text-orange-500" />
                {sessionData?.role || "Interview Session"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {sessionData?.experience} years experience
              </p>
            </div>
          </div>
          <GenerateButton
            onClick={generateQuestions}
            generating={generating}
            loading={loading}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Session Info Card */}
        {sessionData && (
          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-slate-600 font-medium">Role</p>
                <p className="text-xl font-bold text-slate-900">{sessionData.role}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Experience</p>
                <p className="text-xl font-bold text-slate-900">{sessionData.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Questions</p>
                <p className="text-xl font-bold text-orange-600">{questions.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
          </div>
        ) : fetchError ? (
          <ErrorBanner message={fetchError} onRetry={fetchQuestions} />
        ) : questions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <BsLightningChargeFill className="w-20 h-20 text-slate-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-3">No Questions Yet</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Generate AI-powered interview questions tailored to your role and experience level
            </p>
            <button
              onClick={generateQuestions}
              disabled={generating}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 inline-flex items-center gap-2"
            >
              <BsLightningChargeFill className="w-5 h-5" />
              {generating ? "Generating..." : "Generate Questions"}
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              <div className="mb-6">
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  {questions.length} Question{questions.length !== 1 ? "s" : ""}
                </p>
              </div>
              {questions.map((q, i) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <QAItem item={q} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;