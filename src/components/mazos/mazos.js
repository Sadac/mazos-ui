import React, { Fragment, useState, useEffect, useContext } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Mazo from "./mazo";
import Nav from "../nav";

const Mazos = () => {
  const [refresh, setRefresh] = useState(true);
  const [mazos, setMazos] = useState([]);

  useEffect(() => {
    const getMazos = async () => {
      const url = "http://localhost:4000/api/mazo";
      const response = await fetch(url, {
        method: "GET",
      });
      const mazo = await response.json();
      setMazos(mazo)
    };
    getMazos();
    setRefresh(false);
  }, [refresh]);

  return (
    <Fragment>
      <Nav/>
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
              <h4 className="mt-5">Cargando...</h4>
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
            //onClick={() => setModal(true)}
            className="btn btn-success w-25"
          >
            Agregar Mazo
          </button>
        </div>
      </div>
    </Fragment>
  );

}

export default Mazos;
