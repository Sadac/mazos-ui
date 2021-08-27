import Usuarios from "./components/usuarios/usuarios";
import EditarUsuario from "./components/usuarios/editarUsuario";
import EditarMazo from "./components/mazos/editarMazo";
import Mazos from "./components/mazos/mazos";
import Home from "./components/home";
// import UserState from "./context/userState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
  <div className="App">
    <Router>
      <Switch>
        {/* <UserState> */}
          <Route exact path="/" component={Home}/>
          <Route exact path="/usuarios" component={Usuarios}/>
          <Route exact path="/editarusuario" component={EditarUsuario}/>
          <Route exact path="/mazos" component={Mazos}/>
          <Route exact path="/editarmazo" component={EditarMazo}/>
        {/* </UserState> */}
      </Switch>
    </Router>
  </div>
  );
}

export default App;
