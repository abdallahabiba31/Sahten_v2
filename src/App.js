import './App.css';
import Navbar from './components/Navbar/Navbar';
import Searchbar from './components/SearchBar/Searchbar';
import Slider from './components/Slider/Slider';
import CardGallery from './Pages/CardGallery';
import RecipeState from './context/RecipeState';
import ShoppingList from './components/ShoppingList';
import Register from './Pages/Register';
import LogIn from './Pages/LogIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
return ( 
  <Router>
    <Routes>
      <Route path="/" element={<App2 />} />
      <Route path="/shopping-list" element={<ShoppingList />} />
      <Route path="/logIn" element={<LogIn />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
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
