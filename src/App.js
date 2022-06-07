import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Menubar from './component/Menubar';


function App() {

 

  return (
    <div className="App">
      <Menubar></Menubar>
     
    </div>
  );
}

export default App;
