import { Route, Routes, useRoutes } from "react-router-dom";

import { AuthRouter, BookRouter, UserRouter } from "./routers";

function App() {
  const UserRouting = useRoutes(UserRouter);
  const AuthRouting = useRoutes(AuthRouter);
  const BookRouting = useRoutes(BookRouter);

  return (
    <div className="font-Inter">
      <Routes>
        <Route path="/*" element={UserRouting} />
        <Route path="/auth/*" element={AuthRouting} />
      </Routes>
      <Routes>
        <Route path="/*" element={BookRouting} />
      </Routes>
    </div>
  );
}

export default App;
