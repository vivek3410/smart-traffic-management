import { Route, Routes } from 'react-router-dom';
import './App.css';
import PublicRoutes from './routes/publicRoutes';
import NotFound from './pages/not-found';

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<PublicRoutes />} />

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
