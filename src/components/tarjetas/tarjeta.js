import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";

const Tarjeta = ({ setRefresh, tarjeta }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const deleteTarjeta = async (id) => {
    await fetch(`http://localhost:4000/api/tarjeta/${id}`, {
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
          <b> {tarjeta.titulo} </b>
        </td>
        <td className="text-capitalize">
          <span className="font-weight-bold">
            <b> {tarjeta.contenido} </b>
          </span>
        </td>
        <td>
          <b> {tarjeta.Mazo}</b>
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
            ¿Estas seguro que deseas eliminar a
            <b className="text-capitalize"> {tarjeta.titulo}</b>?
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              deleteTarjeta(tarjeta.id);
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
        <Redirect to={{ pathname: "/editartarjeta", state: tarjeta }} />
      ) : null}
    </Fragment>
  );
};

export default Tarjeta;
