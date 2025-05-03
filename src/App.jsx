import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import UpdatePost from "./pages/UpdatePost";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<UpdatePost />} />
      </Routes>
      <ToastContainer autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;
