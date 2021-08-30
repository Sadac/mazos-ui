import React, { Fragment, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Redirect } from "react-router-dom";

const Usuario = ({ user, setRefresh }) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [detalle, setDetalle] = useState(false)
  const [userDetail, setUserDetail] = useState([]);
  const mazos = userDetail.Mazos ? userDetail.Mazos : null;
  const medallas = userDetail.medallas ? userDetail.medallas : null;

  const handleDelete = async (id) => {
    setDel(true);
  };

  const deleteAssistant = async (id) => {
    await fetch(`http://localhost:4000/api/usuario/${id}`, {
      method: "DELETE",
    });
    setRefresh(true);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDetalle = async (id) => {
    setDetalle(true);
    const response = await fetch(`http://localhost:4000/api/usuario/${id}`, {
      method: "GET",
    });
    const respuesta = await response.json();
    setUserDetail(respuesta[0]);
  }
  return (
    <Fragment>
      <tr>
        <td className="text-capitalize">
          <b> {user.nombre} </b>
        </td>
        <td className="text-capitalize">
          <span className="font-weight-bold">
            <b> {user.apellido} </b>
          </span>
        </td>
        <td>
          <b> {user.email} </b>
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
          <button onClick={() => handleDetalle(user.id)} type="button" className="btn btn-outline-info">Detalle</button>
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

      <Modal isOpen={detalle}>
        <ModalHeader>
          <h4>Informacion del Usuario</h4>
        </ModalHeader>
        <ModalBody>
          <ul>
            <li className="text-capitalize ">
              <b>Nombre: </b> <i>{user.nombre}</i>
            </li>
            <li className="text-capitalize">
              <b>Apellido: </b>
              <i>{user.apellido}</i>
            </li>
            <li>
              <b>Email: </b>
              <i>{user.email}</i>
            </li>
            <li className="text-capitalize">
              <b>Mis mazos: </b>
              <i>{userDetail.Mazos ? mazos.map(mazo => ` ${mazo.nombre}, `):'Cargando mazos...'} </i>
            </li>
            <li className="text-capitalize">
              <b>Mis medallas: </b>
              <i>{userDetail.medallas ? medallas.map(medalla => ` ${medalla[0].nombre}, `) :'Cargando medallas...'} </i>
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


      {edit ? (
        <Redirect to={{ pathname: "/editarusuario", state: user }} />
      ) : null}
    </Fragment>
  );
};

export default Usuario;
