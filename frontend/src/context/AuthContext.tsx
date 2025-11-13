//import { api } from "@api/api";
import {
  createContext,
  useContext,
  //   useEffect,
  //   useLayoutEffect,
  useState,
  type PropsWithChildren,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  currentUser?: User | null;
}

type User = {
  email: string;
  username: string;
  role: string;
  profileImage: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      //const response = await login();  // import login function or api call - see below commented code for axios/ axios interceptor line 68
      //const {authToken, user} = response.data;
      setIsAuthenticated(true);
      // setToken(authToken);
      //setCurrentUser(user);
    } catch (e) {
      setIsAuthenticated(false);
      //setCurrentUser(null);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    //setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**********   Use Axios Interceptors to add auth token in requests  ********** */
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   // watch - https://www.youtube.com/watch?v=AcYF18oGn6Y  cosden solutions - authentication in react with jwts, ...

//   // we should not store token in cookies because it is easy to get info from cookie for hackers and manupulate it.
//   //more better approach is to set it in memory(app state). that is bit better option. it is not that easy to hack
//   //or maupulate as is in cookies in javascript env.

//   const [token, setToken] = useState<string | null>(); //we will set this in state rather in cookie
//   //we are not setting any value for token that means it is undefined or request state is pending so it is undefined

//   // // on mount try to fetch user from '/api/me' endpoint and get access token
//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const response = await api.get("/api/me"); //as of now not implemented
//         setToken(response.data.accessToken); //setToken from api response in state
//       } catch (e) {
//         setToken(null); //if token is null that means we checked backend but user not exist. if undefined means either user is not logged in or request is still in pending state
//       }
//     };
//     fetchMe();
//   }, []);

//   // If using axios, then axios interceptors can be used to add auth Token in each and every request made out of
//   //   app in runtime. But if not using axios, then we will need to add token manually in each request. Below code
//   // will work and add token in each request automatically in runtime, only if using axios
//   // check .api/helper.js file for backend logic for this type of authentication

//   useLayoutEffect(() => {
//     //this is creating interceptor for request. the reason to use useLayoutEffect instead of useEffect is because we
//     //actually want this to block the rest of the rendering because other components further down in component tree
//     //are actually going to trigger requests and we want to guarnatee that this interceptor is put before any of these
//     //components trigger any request
//     const authInterceptor = api.interceptors.request.use((config) => {
//       config.headers.Authorization =
//         !config._retry && token //checking if we have token. config._retry - has new refresh token
//           ? `Bearer ${token}` //add token
//           : config.headers.Authorization; //else pass authorisation header as it was before
//       return config;
//     });

//     return () => {
//       api.interceptors.request.eject(authInterceptor);
//     };
//   }, [token]); // whenever token changes, add and put it in every request

//   useLayoutEffect(() => {
//     //this interceptor works when request has expired token. so instead of sign him out, just asking for
//     //send a new refresh token and then apend that new token in original request
//     const refreshInterceptor = api.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config; //if original request has err

//         if (
//           error.response.status === 403 &&
//           error.response.data.message === "Unauthorized"
//         ) {
//           try {
//             const response = await api.get("./api/refreshToken");
//             setToken(response.data.accessToken); //setting new token

//             originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//             originalRequest._retry = true; //line 72 we are checking if true then only add token else use old header which has existing  token

//             return api(originalRequest); //firing api request again with new token
//           } catch (error) {
//             setToken(null);
//           }
//         }
//         return Promise.reject(error);
//       },
//     );

//     return () => {
//       api.interceptors.response.eject(refreshInterceptor);
//     };
//   }, []);
// };
