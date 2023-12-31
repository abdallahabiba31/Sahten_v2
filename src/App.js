import './App.css';
import Navbar from './components/Navbar/Navbar';
import Searchbar from './components/SearchBar/Searchbar';
import Slider from './components/Slider/Slider';
import CardGallery from './Pages/CardGallery';
import RecipeState from './context/RecipeState';
import ShoppingList from './Pages/ShoppingList';
import Register from './Pages/Register';
import LogIn from './Pages/LogIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';
import PrivateRoutes from "./Router/PrivateRoutes"

function App() {

  const [jwt, setJwt] = useState(localStorage.getItem('accessToken'))

  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      <Router>
        <Routes>
          <Route path="/" element={<App2 />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/shopping-list" element={<ShoppingList />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
function App2() {
  return (
    <div className='App'>
      <RecipeState>
        <Navbar />
        <Slider />
        <Searchbar />
        <CardGallery />
      </RecipeState>
    </div>
  );
}

export default App;