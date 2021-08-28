import React, { Fragment, useState, useEffect } from "react";
import Nav from "../nav";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Tarjeta from "./tarjeta";

const Tarjetas = () => {
  const [refresh, setRefresh] = useState(true);
  const [tarjetas, setTarjetas] = useState([]);

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
              <h4 className="mt-5">Cargando...</h4>
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
            //onClick={() => setModal(true)}
            className="btn btn-success w-25"
          >
            Agregar Tarjeta
          </button>
        </div>
      </div>

      {/* <Modal isOpen={modal}>
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
      </Modal> */}
    </Fragment>
  );
};

export default Tarjetas;
