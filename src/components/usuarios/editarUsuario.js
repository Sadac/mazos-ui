import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

const EditarUsuario = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { state: user } = props.location;
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState(false);

  let editado = {
    nombre,
    apellido,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre && !apellido) {
      setError(true);
      return;
    }
    setError(false);
    let datas = {};
    if (editado.nombre) {
      datas.nombre = editado.nombre;
    }
    if (editado.apellido) {
      datas.apellido = editado.apellido;
    }
    const data = await fetch(
      `https://mazos-api.herokuapp.com/api/usuario/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      }
    );
    await data.json();
    alert("Usuario actualizado exitosamente.");
    setRedirect(true);
  };

  const cancel = () => {
    setRedirect(true);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 card p-5">
          <h4 className="mt-5">Editar Informacion del Usuario</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={nombre}
              placeholder={`Nombre: ${user.nombre}`}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder={`Apellido: ${user.apellido}`}
            />
            {error ? (
              <p className="p-2 mt-2 bg-danger rounded text-light">
                <b>Debes actualizar al menos un campo</b>
              </p>
            ) : null}
            <br /> <br /> <br />
            <button type="submit" className="btn btn-success btn-block m-3">
              Editar
            </button>
            <button
              type="button"
              onClick={cancel}
              className="btn btn-secondary btn-block"
            >
              Cancelar
            </button>
            {redirect ? <Redirect to="/usuarios" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditarUsuario;
