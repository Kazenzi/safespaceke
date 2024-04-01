
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import Submit from './Components/Submit';


function App() {
  return (
   <Router>
   <div className='App'> 
   <Navigation/>
   <Routes>
   <Route exact path="/" element={<><Home /></>}/>
   <Route path="/submit" element={<><Submit /></>} />
   </Routes>
   </div>
   </Router>
  );
}

export default App;
