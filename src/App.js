import Usuarios from "./components/usuarios/usuarios";
import UserState from "./context/userState";
import "./App.css";

function App() {
  return (
    <UserState>
      <div className="App">
        <Usuarios />
      </div>
    </UserState>
  );
}

export default App;
