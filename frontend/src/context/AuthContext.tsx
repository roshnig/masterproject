import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

import { fetchAuthSession, getCurrentUser, signIn, signOut, type AuthUser } from "aws-amplify/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  refreshUser?:() => Promise<void>
  login: (email:string, password:string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  //Restore session on api load
  const restoreSession = async () => {
    try {
      const currentUser =await getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true)
    }catch{
      setUser(null)
      setIsAuthenticated(false)
    }finally{
      setLoading(false)
    }
  }

  //useEffect runs asynchronously while useLayoutEffect runs synchronously and fires before the browser repaints the screen. both do samething
  useLayoutEffect(() => {
    restoreSession()
  },[])

  const login = async (email:string, password:string) => {
    const result = await signIn({
      username:email,
      password
    })

    if(!result.isSignedIn){
      throw new Error(result.nextStep.signInStep)
    }
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    setUser(currentUser);
    setIsAuthenticated(true)
  };

  const logout = async () => {
    await signOut()
    setIsAuthenticated(false);
    setUser(null);
  };

  //Manual refresh
   const refreshUser = async () => {
    try {
      await fetchAuthSession({forceRefresh:true})
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true)
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      await signOut()
    }
  };

   const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  );
};
