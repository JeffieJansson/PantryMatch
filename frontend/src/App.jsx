import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Member from "./pages/member";
import Home from "./pages/home";
import { useUserStore } from "./stores/userStore";
import About from "./pages/about";
import GlobalStyles from "./styles/GlobalStyles";
import SavedRecipes from "./pages/SavedRecipes";


export const App = () => {

  const { user, setUser, logout } = useUserStore();
  const [isSigningUp, setIsSigningUp] = useState(false);


  return (
    <BrowserRouter>
      <Navigation />
      <GlobalStyles />

      <main>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/member"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
            <Member
              isSigningUp={isSigningUp}
              setIsSigningUp={setIsSigningUp}
              handleLogin={setUser}
            />
            )
          }
        />

        {/* Protected/Auth route */}
        <Route 
        path="/savedrecipes" 
        element={
          user ? 
          <SavedRecipes /> 
          : 
          <Navigate to="/member" />}
           />


        <Route
          path="/about"
          element={<About />}
        />


      </Routes>
      </main>
    </BrowserRouter>
  );
};
