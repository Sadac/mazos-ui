import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";

const Medalla = ({ setRefresh, medalla }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [add, setAdd] = useState(false);

  const deleteMedalla = async (id) => {
      await fetch(`http://localhost:4000/api/medalla/${id}`, {
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

  const AgregarMedallaUsuario = () => {
setAdd(true);
  }

  const crearMedalla = async () => {
    await fetch('http://localhost:4000/api/usuario/add',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    //  body: JSON.stringify(medallaAgregar),
    })
    alert("Medalla agregada al usuario exitosamente");
    setAdd(false);
  }
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
          <button 
          className="btn btn-primary m-1"
          type="button"
          onClick={() => AgregarMedallaUsuario()}
          >+</button>
          <button className="btn btn-danger">-</button>
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


      <Modal isOpen={add}>
        <ModalHeader>
          <h2>Agregar medalla a un Usuario</h2>
        </ModalHeader>
        <ModalBody>
          <form>
            <input
            type="text"
            placeholder="nombre de la medalla..."
            className="form-control"
            />
            <input
            className="form-control mt-2"
            placeholder="email del usuario..."
            type="email"
            />
          </form>
        </ModalBody>
        <ModalFooter>
        <button
            className="btn btn-success btn-block"
            type="button"
            onClick={crearMedalla}
          >
            Crear
          </button>
          <button
            onClick={() => {
              setAdd(false);
            }}
            className="btn btn-block btn-danger"
            type="button"
          >
            Cancelar
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
