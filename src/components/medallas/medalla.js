import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";

const Medalla = ({ setRefresh, medalla }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const deleteMedalla = async (id) => {
    const eliminado = await fetch(`http://localhost:4000/api/medalla/${id}`, {
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

  return (
    <Fragment>
      <tr>
        <td className="text-capitalize">
          <b> {medalla.nombre} </b>
        </td>
        <td className="text-capitalize">
          <span className="font-weight-bold">
            <b> {medalla.descripcion} </b>
          </span>
        </td>
        <td>
          <b> {medalla.puntos}</b>
        </td>
        <td className="acciones">
          <button
            onClick={handleEdit}
            className="btn btn-outline-secondary m-1"
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-outline-danger font-weight-bold "
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
        </td>
      </tr>

      <Modal isOpen={del}>
        <ModalHeader>Confirmacion</ModalHeader>
        <ModalBody>
          <p>
            ¿Estas seguro que deseas eliminar la
            <b className="text-capitalize"> {medalla.nombre}</b>?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              deleteMedalla(medalla.id);
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

      {edit ? (
        <Redirect to={{ pathname: "/editarmedalla", state: medalla }} />
      ) : null}
    </Fragment>
  );
};

export default Medalla;
