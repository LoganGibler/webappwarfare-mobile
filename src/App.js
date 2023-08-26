// CHODIKAR_USEPOLLING=true npm run start
// new react comp: rafce
import React from "react";
import { UserProfile, Guides, Header, Footer } from "./containers";
import { Navigation, Home, Profile } from "./components";
import "./app.css"

const App = () => {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Navigation />
        <Header />
      </div>
    {/* <route path="/UserProfile"></route> */}
    <Footer />
    </div>
  );
};

export default App;
