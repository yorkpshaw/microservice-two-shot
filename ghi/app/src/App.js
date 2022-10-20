import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList />} />
          <Route path="new" element={<ShoeForm />} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
