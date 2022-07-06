import UserContext from "./components/AccountContext";
import ToggleColorMode from "./components/ColorModeToggler";
import Views from "./components/Views";
import socket from "./socket";

function App() {
  socket.connect()
  return (
    <UserContext>
      <Views />
      <ToggleColorMode />
    </UserContext>
  );
}

export default App;
