import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";

const EditarUsuario = (props) => {
  const [redirect, setRedirect] = useState(false);
  const {state:user} = props.location;
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  let editado = {
    nombre,
    apellido
  }
  const handleSubmit = async (e) => {
    console.log(editado)
    e.preventDefault();
    let datas = {};
    if (editado.nombre) {
      datas.nombre = editado.nombre;
    }
    if (editado.apellido) {
      datas.apellido = editado.apellido;
    }
    
    const data = await fetch(
      `http://localhost:4000/api/usuario/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      }
    );
    await data.json();
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
            {redirect ? <Redirect to="/" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );

}

export default EditarUsuario;