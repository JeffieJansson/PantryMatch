import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Member from "./pages/member";
import Home from "./pages/home";
import { useUserStore } from "./stores/userStore";
import About from "./pages/about";
import GlobalStyles from "./GlobalStyles";


export const App = () => {

  const { user, setUser, logout } = useUserStore();
  const [isSigningUp, setIsSigningUp] = useState(false);


  return (
    <BrowserRouter>
      <Navigation />
      <GlobalStyles />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/member"
          element={
            <Member
              user={user}
              isSigningUp={isSigningUp}
              setIsSigningUp={setIsSigningUp}
              handleLogin={setUser}
              handleLogout={logout}
            />
          }
        />

        {/* Protected/Auth route */}
        <Route
          path="/saved"
          element={
            user ? <h2>Saved Recipes</h2> : <Navigate to="/member" />
          }
        />


        <Route
          path="/about"
          element={<About />}
        />


      </Routes>
    </BrowserRouter>
  );
};
