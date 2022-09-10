import React, { useState, useEffect } from "react";
import { getAllDogs } from "./api";
import './App.css';

import {
   Register,
   Login,
   Logout,
   Home,
} from "./Components";

function App() {
   const [username, setUsername] = useState();
   const [password, setPassword] = useState();
   const [email, setEmail] = useState();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [token, setToken] = useState();
   const [dogsList, setDogsList] = useState ([{}])

   useEffect(() => {
      getAllDogs().then((results) => {
         setDogsList(results)
      });
      onload();
   }, []);

   function onLoad() {
      try {
         const storedToken = localStorage.getItem('token');
         if (storedToken) {
            setToken(storedToken)
         }
      } catch (event) {
         if (event !== "No current user") {
            alert(event);
         }
      }
   }

   return (
      <div className='App'>
         <header className='App-header'>
            <p>
               Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
               className='App-link'
               href='https://reactjs.org'
               target='_blank'
               rel='noopener noreferrer'>
               Learn React
            </a>
         </header>
      </div>
   );
}

export default App;
