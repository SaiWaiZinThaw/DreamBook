import { Route, Routes, useRoutes } from "react-router-dom";

import { UserRouter } from "./routers";
import { AuthLayout } from "./pages/auth";

function App() {
  const UserRouting = useRoutes(UserRouter);

  return (
    <div>
      <AuthLayout />
    </div>
  );
}

export default App;
