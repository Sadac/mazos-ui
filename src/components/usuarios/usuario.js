import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Usuario = ({ user, setRefresh }) => {
  const [del, setDel] = useState(false);

  const handleDelete = async (id) => {
    setDel(true);
  };

  const deleteAssistant = async (id) => {
    await fetch(`http://localhost:4000/api/usuario/${id}`, {
      method: "DELETE",
    });
    setRefresh(true);
  };

  return (
    <Fragment>
      <tr>
        <td className="text-capitalize">
          <b> {user.nombre} </b>
        </td>
        <td>
          <span className="font-weight-bold">
            <b> {user.apellido} </b>
          </span>
        </td>
        <td>
          <b> {user.email} </b>
        </td>
        <td className="acciones">
          <button
            //onClick={handleEdit}
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
            ¿Estas seguro que deseas eliminar a
            <b className="text-capitalize"> {user.nombre}</b>?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              deleteAssistant(user.id);
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
    </Fragment>
  );
};

export default Usuario;
