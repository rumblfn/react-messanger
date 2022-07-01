import UserContext from "./components/AccountContext";
import ToggleColorMode from "./components/ColorModeToggler";
import Views from "./components/Views";

function App() {
  return (
    <UserContext>
      <Views />
      <ToggleColorMode />
    </UserContext>
  );
}

export default App;
