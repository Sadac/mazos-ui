import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";

const Medalla = ({ setRefresh, medalla }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [add, setAdd] = useState(false);
  const [email, setEmail] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [emailDelete, setEmailDelete] = useState("");

  const deleteMedalla = async (id) => {
    await fetch(`https://mazos-api.herokuapp.com/api/medalla/${id}`, {
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
  };
  const EliminarMedallaUsuario = () => {
    setDeleted(true);
  };

  const crearMedalla = async () => {
    const data = {
      nombre: medalla.nombre,
      email,
    };

    if (!data.email) {
      alert("Debe colocar un Email");
      return;
    }
    const response = await fetch(
      "https://mazos-api.herokuapp.com/api/usuario/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const respuesta = await response.json();
    if (respuesta.message) {
      if (
        respuesta.message == "La medalla no existe, intenta con otro nombre"
      ) {
        alert(respuesta.message);
        return;
      }
      if (respuesta.message === "El usuario no existe") {
        alert(respuesta.message);
        return;
      }
      if (respuesta.message === "El usuario ya tiene ganada esta medalla.") {
        alert(respuesta.message);
        return;
      }
    }
    setEmail("");
    alert("Medalla agregada al usuario exitosamente");
    setAdd(false);
  };

  const eliminarMedalla = async () => {
    const dataDelete = {
      email: emailDelete,
      medallaId: medalla.id,
    };

    if (!dataDelete.email) {
      alert("Debe colocar un email");
      return;
    }
    console.log(dataDelete);
    const response = await fetch(
      "https://mazos-api.herokuapp.com/api/usuario/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataDelete),
      }
    );
    const respuesta = await response.json();
    console.log(respuesta);
    if (respuesta.message === "Usuario no existe.") {
      alert(respuesta.message);
      return;
    }
    if (
      respuesta.message ===
      "No se puede eliminar porque el usuario no tiene la medalla ganada."
    ) {
      alert(respuesta.message);
      return;
    }
    if (
      respuesta.message === "El usuario ha perdido la medalla exitosamente."
    ) {
      alert(respuesta.message);
    }
    setEmailDelete("");
    setDeleted(false);
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
          <button
            className="btn btn-primary m-1"
            type="button"
            onClick={() => AgregarMedallaUsuario()}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => EliminarMedallaUsuario()}
          >
            -
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

      <Modal isOpen={add}>
        <ModalHeader>
          <h2>Agregar medalla a un Usuario</h2>
        </ModalHeader>
        <ModalBody>
          <form>
            <input
              className="form-control mt-2"
              placeholder="email del usuario..."
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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

      <Modal isOpen={deleted}>
        <ModalHeader>
          <h2>Eliminar medalla a un Usuario</h2>
        </ModalHeader>
        <ModalBody>
          <form>
            <input
              className="form-control mt-2"
              placeholder="email del usuario..."
              type="email"
              name="email"
              onChange={(e) => setEmailDelete(e.target.value)}
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger btn-block"
            type="button"
            onClick={eliminarMedalla}
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              setDeleted(false);
            }}
            className="btn btn-block btn-success"
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
