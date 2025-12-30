import { ProtectedRoute } from "@/routes";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";

export function RouterTestWrapper({
  children,
  initialPath = "/",
}: {
  children: ReactNode;
  initialPath?: string;
}) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path='/login' element={children} />
        <Route
          path='/*'
          element={<ProtectedRoute>{children}</ProtectedRoute>}
        />
      </Routes>
    </MemoryRouter>
  );
}
