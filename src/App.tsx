import { Route, Routes, useRoutes } from "react-router-dom";

import { AuthRouter, UserRouter } from "./routers";

function App() {
  const UserRouting = useRoutes(UserRouter);
  const AuthRouting = useRoutes(AuthRouter);

  return (
    <div className="font-Inter">
      <Routes>
        <Route path="/*" element={UserRouting} />
        <Route path="/auth/*" element={AuthRouting} />
      </Routes>
    </div>
  );
}

export default App;
