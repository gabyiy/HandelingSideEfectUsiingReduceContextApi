import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //cu useEfect facem sa se execute doar cand se indeplinesc conditiile sa controlam,la usefect trecem doua argumente primu este un arrow function in care executa ce avem acolo  si al doilea este un array,cu usestate facem ca componentu asta sa se initializeze doar dodata la inceput
  useEffect(() => {
    //aici salvam in  const ce avem  in local storage

    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    //aici daca e avem in storage este egal cu 1 o sa schimbam isLogin in true
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem("isLoggedIn", "1");
    //asa salvam data in sotargu local al pagini (chiar daca reinitializma pagina d2atele raman)
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    //iar aici ii dam remove  din local storege cand facem delog
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
