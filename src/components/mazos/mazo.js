import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";

const Mazo = ({ mazo, setRefresh }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [detalle, setDetalle] = useState(false)
  const [mazoDetail, setMazoDetail] = useState([]);
  const tarjetas = mazoDetail.Tarjetas ? mazoDetail.Tarjetas : null;

  const deleteMazo = async (id) => {
    await fetch(`http://localhost:4000/api/mazo/${id}`, {
      method: "DELETE",
    });
    setRefresh(true);
  };

  const handleDelete = async (id) => {
    setDel(true);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDetalle = async (id) => {
    setDetalle(true);
    const response = await fetch(`http://localhost:4000/api/mazo/${id}`, {
      method: "GET",
    });
    const respuesta = await response.json();
    setMazoDetail(respuesta[0]);
  }

  return (
    <Fragment>
      <tr>
        <td className="text-capitalize">
          <b> {mazo.nombre} </b>
        </td>
        <td className="text-capitalize">
          <span className="font-weight-bold">
            <b> {mazo.descripcion} </b>
          </span>
        </td>
        <td>
          <b> {mazo.usuario} </b>
        </td>
        <td className="acciones">
          <button
            onClick={handleEdit}
            className="btn btn-outline-secondary"
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-outline-danger m-1 "
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
          <button
          onClick={() => handleDetalle(mazo.id)}
          type="button"
          className="btn btn-outline-info"
          >
            Detalle
            </button>

        </td>
      </tr>

      <Modal isOpen={del}>
        <ModalHeader>Confirmacion</ModalHeader>
        <ModalBody>
          <p>
            ¿Estas seguro que deseas eliminar a
            <b className="text-capitalize"> {mazo.nombre}</b>?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              deleteMazo(mazo.id);
              setDel(false);
            }}
            className="btn btn-danger btn-block"
          >
            Si
          </button>
          <button
            onClick={() => setDel(false)}
            className="btn btn-primary btn-block"
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={detalle}>
        <ModalHeader>
          <h2>Información del Mazo</h2>
          <i className="h6">Nota: Si ' Tarjetas ' esta vacío es porque ese mazo no tiene tarjetas asignadas.</i>
        </ModalHeader>
        <ModalBody>
          <ul>
            <li className="text-capitalize ">
              <b>Nombre: </b> <i>{mazo.nombre}</i>
            </li>
            <li className="text-capitalize">
              <b>Descripcion: </b>
              <i>{mazo.descripcion}</i>
            </li>
            <li>
              <b>Pertenezco a: </b>
              <i className="text-capitalize">{mazo.usuario}</i>
            </li>
            <li>
              <b>Tarjetas:</b>
              <i className="text-capitalize">
                {mazoDetail.Tarjetas ? tarjetas.map( tarjeta => ` ${tarjeta.titulo}, `) : ' Cargando...'}
              </i>
            </li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setDetalle(false)}
            className="btn btn-block btn-primary"
            type="button"
          >
            OK
          </button>
        </ModalFooter>
      </Modal>


      {edit ? <Redirect to={{ pathname: "/editarmazo", state: mazo }} /> : null}
    </Fragment>
  );
};

export default Mazo;
