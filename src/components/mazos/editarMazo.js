import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";

const EditarMazo = (props) => {
  const {state:mazo} = props.location;
  const [redirect, setRedirect] = useState(false);
  const [nombre,setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error,setError] = useState(false);


  let editado = {
    nombre,
    descripcion
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if(!nombre && !descripcion){
      setError(true);
      return;
    }
    setError(false)


    let datas = {};
    if (editado.nombre) {
      datas.nombre = editado.nombre;
    }
    if (editado.descripcion) {
      datas.descripcion = editado.descripcion;
    }
    
    const data = await fetch(
      `http://localhost:4000/api/mazo/${mazo.id}`,
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






  }
  const cancel = () => {
    setRedirect(true);
  };
  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 card p-5">
          <h4 className="mt-5">Editar Informacion del Mazo</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={nombre}
              placeholder={`Nombre: ${mazo.nombre} `}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
             name={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder={`Descripcion: ${mazo.descripcion} `}
            />
            {error ? <p className="p-2 mt-2 bg-danger rounded text-light"><b>Debes actualizar al menos un campo</b></p> : null}
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
            {redirect ? <Redirect to="/mazos" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default EditarMazo;
