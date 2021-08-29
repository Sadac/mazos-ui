import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

const EditarTarjeta = (props) => {
  const { state: tarjeta } = props.location;
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  let editado = {
    titulo,
    contenido,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo && !contenido) {
      setError(true);
      return;
    }
    setError(false);

    let datas = {};
    if (editado.titulo) {
      datas.titulo = editado.titulo;
    }
    if (editado.contenido) {
      datas.contenido = editado.contenido;
    }

    const data = await fetch(
      `http://localhost:4000/api/tarjeta/${tarjeta.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      }
    );
    await data.json();
    alert("Tarjeta actualizada exitosamente.");
    setRedirect(true);
  };
  const cancel = () => {
    setRedirect(true);
  };
  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 card p-5">
          <h4 className="mt-5">Editar Informacion de la tarjeta</h4>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={titulo}
              placeholder={`Nombre: ${tarjeta.titulo} `}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <input
              type="text"
              className="form-control w-100 mt-2"
              name={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder={`Descripcion: ${tarjeta.contenido} `}
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
            {redirect ? <Redirect to="/tarjetas" /> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditarTarjeta;
