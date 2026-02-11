import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/home";
import { useUserStore } from "./stores/userStore";
import About from "./pages/about";


export const App = () => {

  const { user, setUser, logout } = useUserStore();
  const [isSigningUp, setIsSigningUp] = useState(false);


  return (
    <BrowserRouter>

      <Navigation />

      <Routes>
        
        <Route
          path="/"
          element={
            <Home
              user={user}
              isSigningUp={isSigningUp}
              setIsSigningUp={setIsSigningUp}
              handleLogin={setUser}
              handleLogout={logout}
            />
          }
        />


        {/* Protected route */}
        <Route
          path="/saved"
          element={
            user ? <h2>Saved Recipes</h2> : <Navigate to="/" />
          }

        />


        <Route
          path="/about"
          element={
            <About />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};
