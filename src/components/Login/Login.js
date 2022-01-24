import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //daca ca al doilea parametru la useState  avem []([] este o dempendenci) acesta ar rula doar odata,daca vrem sa se initializeze de fiecare data cand pulsam o tasta
  //de acea in dependenci adica in [] introducem cand anume vrem sa se initializeze dinou ce avem in functia  de useEffect adica  in cazu nostru in caza ca se modifica ceva la setFormIsValid,enteredEmail,sau laEnteredPasword ,adica de fiecare data cand adaugam o litera la username sau la parola
  useEffect(() => {
    const identifer = setTimeout(() => {
      console.log("Checking form validicy");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      console.log("Cleanup");
      clearTimeout(identifer);
    };
  }, [enteredEmail, enteredPassword]);
  //debouncing este o metoda folosita ca sa nu tyransmitem fiecare key stroke in enteredEmail sau enteredPasword ci mai exact vrem sa verificam doar odata dupa ceva timp cand numai  useru nu mai a tastant nimic ,pentru asta fdolosim  setTimout care executa ce avem in interior dupa 5 secunde
  //cu return facem ca dupa primu run cu useEfect utizizam identiferu care practic este ce avem in timout
  //si il utilizam la return ca sa face un clear cu clearTimout practic rfestand imediat timeru cea ce ne ajuta sa numai salvam raspunsu odata la 500 ms ci doar dupa o perioada mai indelungata

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    //aici avem o forma de validre daca
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
