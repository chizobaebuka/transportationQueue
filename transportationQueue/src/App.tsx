// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import your Home component

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Transportation Queue Application</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
