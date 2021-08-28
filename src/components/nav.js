import React, { Fragment } from "react";
const Nav = () => {
  return (
    <Fragment>
      <nav className="navbar-dark bg-dark p-3">
        <a className="margen-left navbar-brand" href="/">
          Home
        </a>

        <a className="navbar-brand" href="/usuarios">
          Usuarios
        </a>

        <a className="navbar-brand" href="/mazos">
          Mazos
        </a>
        <a className="navbar-brand" href="/tarjetas">
          Tarjetas
        </a>
        <a className="navbar-brand" href="/medallas">
          Medallas
        </a>
      </nav>
    </Fragment>
  );
};

export default Nav;
