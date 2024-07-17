import { Route, Routes, useRoutes } from "react-router-dom";

import { AuthRouter, BookRouter, UserRouter } from "./routers";
import ProfileRouter from "./routers/ProfileRouter";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const UserRouting = useRoutes(UserRouter);
  const AuthRouting = useRoutes(AuthRouter);
  const BookRouting = useRoutes(BookRouter);
  const ProfileRouting = useRoutes(ProfileRouter);
  const { getThemeInStorage } = useAuth();
  const Theme = getThemeInStorage();
  return (
    <div className={`${Theme} font-Inter `}>
      <Routes>
        <Route path="/*" element={UserRouting} />
        <Route path="/auth/*" element={AuthRouting} />
        <Route path="/me/*" element={ProfileRouting} />
        <Route path="book-dashboard/*" element={BookRouting} />
      </Routes>
    </div>
  );
}

export default App;
