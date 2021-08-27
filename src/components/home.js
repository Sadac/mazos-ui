import React, { Fragment } from "react";
import Nav from "./nav";
const Home = () => {
  return (
    <Fragment>
      <Nav />
      
        <div className="mt-5">
          <h1>Bienvenidos</h1>
          <div className="mt-4">
            <h3>Proyecto de SAIA</h3>
            <h5>Rocco Sada, </h5>
          </div>
        </div>
      
      
    </Fragment>
  );
};

export default Home;
