import React, { Fragment, useState, useEffect, useContext } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Nav from "../nav";
import Usuario from "./usuario";

const Usuarios = () => {
  const [usuario, setUsuario] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });
  const { nombre, apellido, email } = user;

  useEffect(() => {
    const getUsers = async () => {
      const url = "http://localhost:4000/api/usuario";
      const response = await fetch(url, {
        method: "GET",
      });
      const usuario = await response.json();
      setUsuario(usuario);
    };
    getUsers();
    setRefresh(false);
  }, [refresh]);
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || apellido.trim() === "" || email.trim() === "") {
      setError(true);
      return;
    }

    await fetch("http://localhost:4000/api/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setError(false);
    setModal(false);
    setRefresh(true);
    setUser({
      nombre: "",
      apellido: "",
      email: "",
    });
  };
  return (
    <Fragment>
      <Nav />
      <div className="mt-3">
        <div className="row">
          <div className="col-md-11">
            <h1>Usuarios</h1>
          </div>
        </div>
        <div className="col-md-1"></div>

        <table className="mt-3 table table-striped">
          <thead className="bg-primary table-dark ">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!usuario.length ? (
              <h4 className="mt-5">Cargando...</h4>
            ) : (
              usuario.map((user) => (
                <Usuario setRefresh={setRefresh} user={user} key={user.id} />
              ))
            )}
          </tbody>
        </table>
        <div className="derecha">
          <button
            type="button"
            onClick={() => setModal(true)}
            className="btn btn-success w-25"
          >
            Agregar Usuario
          </button>
        </div>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Crea un Usuario</h4>
        </ModalHeader>
        <ModalBody>
          <form>
            {error ? (
              <p className="p-2 bg-danger rounded text-light">
                Nombre, apellido e Email son obligatorios
              </p>
            ) : null}
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del usuario..."
              name="nombre"
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Apellido del usuario..."
              name="apellido"
              onChange={handleChange}
            />
            <input
              type="email"
              className="form-control mt-2"
              placeholder="Email del usuario..."
              name="email"
              onChange={handleChange}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-success btn-block"
            type="button"
            onClick={handleSubmit}
          >
            Crear
          </button>
          <button
            onClick={() => {
              setModal(false);
            }}
            className="btn btn-block btn-danger"
            type="button"
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Usuarios;
