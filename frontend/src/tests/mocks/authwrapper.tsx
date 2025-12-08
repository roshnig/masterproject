import { AuthProvider } from "@/context/AuthContext";
import type { ReactNode } from "react";

export function AuthTestWrapper({children}: {children: ReactNode}) {
    return <AuthProvider>{children}</AuthProvider>
}