import { Howl } from "howler";
import Views from "./components/Views";
import useSocketSetup from "./hooks/useSocketSetup";

function App() {
  let messageSound = new Howl({
    src: ['/sounds/message-sound.mp3']
  })
  useSocketSetup(messageSound);

  return <Views />
}

export default App;
