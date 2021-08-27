import { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    fechaCreacion: "",
  });
  return (
    <userContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
