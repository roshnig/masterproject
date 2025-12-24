import axios from "axios";
import { fetchAuthSession, signOut } from "aws-amplify/auth";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // or process.env
  timeout: 30000,
});

// ✅ Attach Cognito Token Automatically
axiosClient.interceptors.request.use(
  async (config) => {
    const session = await fetchAuthSession();
    //   const token = session.tokens?.idToken?.toString();
    const token = session.tokens?.accessToken?.toString();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ✅ Handle 401 (sign out if refresh token has expired while user was not working, so need to signout automatically)
// + Refresh Token (add new refresh token in original request if it has expired while user is working)

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = fetchAuthSession({ forceRefresh: true }).finally(
            () => {
              isRefreshing = false;
            },
          );
        }

        await refreshPromise;

        const session = await fetchAuthSession();
        const newToken = session.tokens?.accessToken?.toString();

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`; //adding new token in original request
        }
        return axiosClient(originalRequest);
      } catch {
        //refresh token expired when user was not active - forced logout
        await signOut();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// // ✅ Global Error Handling - show errors in toast
// axiosClient.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const message =
//       error.response?.data?.message ||
//       error.message ||
//       'Unknown API Error';
//     console.error('API Error:', message);
//     return Promise.reject(error);
//   }
// );
