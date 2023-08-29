// CHODIKAR_USEPOLLING=true npm run start
// new react comp: rafce
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import React, { Fragment } from "react";
import { UserProfile, Guides, Header, Footer } from "./containers";
import { Navigation, Home, Profile } from "./components";
import "./app.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Fragment>
          <Navigation />
          <Routes>
            {/* <Route path="/Profile" element={<Profile />}/> */}
          </Routes>
          <Routes>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Home" element={<Header />} />
            <Route path="/Guides" element={<Guides />} />
          </Routes>
          <Footer />
        </Fragment>
      </div>
    </Router>
  );
};

export default App;
