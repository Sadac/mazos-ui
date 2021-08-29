import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

const EditarMedalla = (props) => {
  const { state: medalla } = props.location;
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [puntos, setPuntos] = useState(0);

  let editado = {
    nombre,
    descripcion,
    puntos,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre && !descripcion && puntos === 0) {
      setError(true);
      return;
    }
    setError(false);

    let datas = {};
    if (editado.nombre) {
      datas.nombre = editado.nombre;
    }
    if (editado.descripcion) {
      datas.descripcion = editado.descripcion;
    }
    if (editado.puntos) {
      datas.puntos = editado.puntos;
    }

    const data = await fetch(
      `http://localhost:4000/api/medalla/${medalla.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      }
    );
    await data.json();
    alert("Medalla actualizada exitosamente");
    setRedirect(true);
  };

  const cancel = () => {
    setRedirect(true);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 card p-5">
          <h4 className="mt-5">Editar Informacion de la medalla</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={nombre}
              placeholder={`Nombre: ${medalla.nombre} `}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder={`Descripcion: ${medalla.descripcion} `}
            />
            <input
              type="number"
              className="form-control w-100 mt-2"
              name={puntos}
              onChange={(e) => setPuntos(e.target.value)}
              placeholder={`Puntos: ${medalla.puntos} `}
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
            {redirect ? <Redirect to="/medallas" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditarMedalla;
