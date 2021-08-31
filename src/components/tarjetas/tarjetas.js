import React, { Fragment, useState, useEffect } from "react";
import Nav from "../nav";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Tarjeta from "./tarjeta";

const Tarjetas = () => {
  const [refresh, setRefresh] = useState(true);
  const [tarjetas, setTarjetas] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [tarjeta, setTarjeta] = useState({
    titulo: "",
    contenido: "",
    mazo: "",
  });

  useEffect(() => {
    const getTarjetas = async () => {
      const url = "http://localhost:4000/api/tarjeta";
      const response = await fetch(url, {
        method: "GET",
      });
      const tarjeta = await response.json();
      setTarjetas(tarjeta);
    };
    getTarjetas();
    setRefresh(false);
  }, [refresh]);

  const handleChange = (e) => {
    setTarjeta({
      ...tarjeta,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      tarjeta.titulo.trim() === "" ||
      tarjeta.contenido.trim() === "" ||
      tarjeta.mazo.trim() === ""
    ) {
      setError(true);
      return;
    }
    const response = await fetch("http://localhost:4000/api/tarjeta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarjeta),
    });
    const respuesta = await response.json();
    if (respuesta.message) {
      if (respuesta.message === "El mazo no existe") {
        alert(respuesta.message);
        return;
      }
      if (
        respuesta.message === "La tarjeta ya existe, intenta con otro titulo"
      ) {
        alert(respuesta.message);
        return;
      }
    }
    setError(false);
    setModal(false);
    setRefresh(true);
    setTarjeta({
      titulo: "",
      descrpcion: "",
      email: "",
    });
  };

  return (
    <Fragment>
      <Nav />
      <div className="mt-3">
        <h1>Tarjetas</h1>
        <table className="mt-3 table table-striped">
          <thead className="bg-primary table-dark ">
            <tr>
              <th scope="col">Titulo</th>
              <th scope="col">Contenido</th>
              <th scope="col">Mazo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!tarjetas.length ? (
              <h4 className="mt-5">No hay tarjetas.</h4>
            ) : (
              tarjetas.map((tarjeta) => (
                <Tarjeta
                  setRefresh={setRefresh}
                  tarjeta={tarjeta}
                  key={tarjeta.id}
                />
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
            Agregar Tarjeta
          </button>
        </div>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Crea una Tarjeta</h4>
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
              placeholder="Titulo de la tarjeta..."
              name="titulo"
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Contenido de la tarjeta..."
              name="contenido"
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="nombre del mazo al cual pertenece la tarjeta..."
              name="mazo"
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

export default Tarjetas;
