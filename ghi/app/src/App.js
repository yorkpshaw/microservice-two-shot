import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatsList from './HatsList';
import HatForm from './HatForm';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route index element={<ShoesList />} />
            <Route path="new" element={<ShoeForm />} />
          </Route>
          <Route path="hats">
          <Route index element={<HatsList />} />
            <Route path="new" element={<HatForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
