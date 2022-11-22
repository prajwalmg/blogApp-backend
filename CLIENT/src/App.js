import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/topbar/TopBar";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import Home from "./pages/home/Home";
import { Context } from "./context/Context";

const App = () => {
  const {user} = useContext(Context);
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
          <Route path="/register" element={user ? <Home /> : <Register />}></Route>
          <Route path="/login" element={user ? <Home /> : <Login />}></Route>
          <Route path="/write" element={user ? <Write /> : <Login />}></Route>
          <Route path="/settings" element={user ? <Settings /> :<Login />}></Route>
          <Route path="/post/:postId" element={<Single />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
