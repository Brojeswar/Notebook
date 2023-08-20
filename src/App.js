import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/note/NoteState";
import Alert from "./components/Alert";
import AlertState from "./context/alert/AlertState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <NoteState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <Alert />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </AlertState>
      </NoteState>
    </div>
  );
}

export default App;
