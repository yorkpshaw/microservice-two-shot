import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatForm from './HatForm';
import HatsList from './HatsList';
import ShoeForm from './ShoeForm';
import ShoesList from './ShoesList'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="hats">
            <Route index element={<HatsList />} />
            <Route path="new" element={<HatForm />} />
          </Route>
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
