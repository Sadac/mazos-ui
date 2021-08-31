import React, { Fragment, useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Nav from "../nav";
import Medalla from "./medalla";

const Medallas = () => {
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [medallas, setMedallas] = useState([]);
  const [error, setError] = useState(false);
  const [medalla, setMedalla] = useState({
    nombre: "",
    descripcion: "",
    puntos: 0,
  });
  useEffect(() => {
    const getMedallas = async () => {
      const url = "http://localhost:4000/api/medalla";
      const response = await fetch(url, {
        method: "GET",
      });
      const medalla = await response.json();
      setMedallas(medalla);
    };
    getMedallas();
    setRefresh(false);
  }, [refresh]);

  const handleChange = (e) => {
    setMedalla({
      ...medalla,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      medalla.nombre.trim() === "" ||
      medalla.descripcion.trim() === "" ||
      medalla.puntos.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);

    const response = await fetch("http://localhost:4000/api/medalla", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medalla),
    });
    const respuesta = await response.json();
    if (respuesta.message) {
      if (
        respuesta.message === "La Medalla ya existe, intenta con otro nombre"
      ) {
        alert(respuesta.message);
        return;
      }
    }
    setModal(false);
    setRefresh(true);
    setMedalla({
      nombre: "",
      descripcion: "",
      puntos: "",
    });
  };

  return (
    <Fragment>
      <Nav />

      <div className="mt-3">
        <h1>Medallas</h1>
        <table className="mt-3 table table-striped">
          <thead className="bg-primary table-dark ">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Puntos</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!medallas.length ? (
              <h4 className="mt-5">No hay medallas.</h4>
            ) : (
              medallas.map((medalla) => (
                <Medalla
                  setRefresh={setRefresh}
                  medalla={medalla}
                  key={medalla.id}
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
            Crear Medalla
          </button>
        </div>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader>
          <h4>Crea una Medalla</h4>
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
              placeholder="Nombre de la medalla..."
              name="nombre"
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Descripcion de la medalla..."
              name="descripcion"
              onChange={handleChange}
            />
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Puntos de la medalla..."
              name="puntos"
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

export default Medallas;
