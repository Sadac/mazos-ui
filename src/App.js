import Usuarios from "./components/usuarios/usuarios";
import EditarUsuario from "./components/usuarios/editarUsuario";
import EditarMazo from "./components/mazos/editarMazo";
import Mazos from "./components/mazos/mazos";
import Medallas from "./components/medallas/medallas";
import Home from "./components/home";
import EditarTarjeta from "./components/tarjetas/editarTarjeta";
// import UserState from "./context/userState";
import Tarjetas from "./components/tarjetas/tarjetas";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <UserState> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/usuarios" component={Usuarios} />
          <Route exact path="/editarusuario" component={EditarUsuario} />
          <Route exact path="/mazos" component={Mazos} />
          <Route exact path="/editarmazo" component={EditarMazo} />
          <Route exact path="/tarjetas" component={Tarjetas} />
          <Route exact path="/medallas" component={Medallas} />
          <Route exact path="/editartarjeta" component={EditarTarjeta} />
          {/* </UserState> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
