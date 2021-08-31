import React, { Fragment, useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Mazo from "./mazo";
import Nav from "../nav";

const Mazos = () => {
  const [refresh, setRefresh] = useState(true);
  const [mazos, setMazos] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [mazo, setMazo] = useState({
    nombre: "",
    descripcion: "",
    email: "",
  });

  useEffect(() => {
    const getMazos = async () => {
      const url = "http://localhost:4000/api/mazo";
      const response = await fetch(url, {
        method: "GET",
      });
      const mazo = await response.json();
      setMazos(mazo);
    };
    getMazos();
    setRefresh(false);
  }, [refresh]);

  const handleChange = (e) => {
    setMazo({
      ...mazo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      mazo.nombre.trim() === "" ||
      mazo.descripcion.trim() === "" ||
      mazo.email.trim() === ""
    ) {
      setError(true);
      return;
    }
    const response = await fetch("http://localhost:4000/api/mazo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mazo),
    });
    const respuesta = await response.json();
    if (respuesta.message) {
      if (
        respuesta.message === "El usuario no existe, intenta con otro email"
      ) {
        alert(respuesta.message);
        return;
      }
      if (respuesta.message === "El mazo ya existe, intenta con otro nombre") {
        alert(respuesta.message);
        return;
      }
    }
    setError(false);
    setModal(false);
    setRefresh(true);
    setMazo({
      nombre: "",
      descrpcion: "",
      email: "",
    });
  };
  return (
    <Fragment>
      <Nav />
      <div className="mt-3">
        <h1>Mazos</h1>
        <table className="mt-3 table table-striped">
          <thead className="bg-primary table-dark ">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Usuario</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!mazos.length ? (
              <h4 className="mt-5">No hay mazos.</h4>
            ) : (
              mazos.map((mazo) => (
                <Mazo setRefresh={setRefresh} mazo={mazo} key={mazo.id} />
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
            Agregar Mazo
          </button>
        </div>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Crea un Mazo</h4>
        </ModalHeader>
        <ModalBody>
          <form>
            {error ? (
              <p className="p-2 bg-danger rounded text-light">
                Todos los campos son obligatorios
              </p>
            ) : null}
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del mazo..."
              name="nombre"
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Descripcion del mazo..."
              name="descripcion"
              onChange={handleChange}
            />
            <input
              type="email"
              className="form-control mt-2"
              placeholder="Email del usuario al cual pertenece este mazo..."
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

export default Mazos;
