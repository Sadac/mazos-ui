import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";

const Mazo = ({mazo, setRefresh}) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

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



  return(
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
          <b> {mazo.usuarioId} </b>
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
      {edit ? (
        <Redirect to={{ pathname: "/editarmazo", state: mazo }} />
      ) : null}

    </Fragment>
  );
}

export default Mazo;
