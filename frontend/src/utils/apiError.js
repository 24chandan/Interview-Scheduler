export const getApiErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again.",
) => {
  const data = error.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    try {
      const parsedError = JSON.parse(data.error);
      return parsedError?.error?.message || parsedError?.message || data.error;
    } catch {
      return data.error;
    }
  }

  if (typeof data === "string" && data.trim() && !data.trim().startsWith("<")) {
    return data;
  }

  if (error.response?.status) {
    return `Server returned ${error.response.status}. Please check the API endpoint.`;
  }

  if (error.request) {
    return "Cannot reach the backend server. Make sure it is running on http://localhost:9001.";
  }

  return error.message || fallback;
};
