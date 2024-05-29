import { Route, Routes, useRoutes } from 'react-router-dom'

import { BookRouter, UserRouter } from './routers'

function App() {
  const UserRouting = useRoutes(UserRouter);
  const BookRouting = useRoutes(BookRouter);

  return (
    <div>
       <Routes>
        <Route path="/*" element={UserRouting}/>
      </Routes>
       <Routes>
        <Route path="/*" element={BookRouting}/>
      </Routes>
    </div>
  );
}

export default App;
