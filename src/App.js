import { Howl } from "howler";
import { ExpandFilename } from "./components/ExpandFile";
import ExpandContext from "./components/ToExpandFile";
import Views from "./components/Views";
import useSocketSetup from "./hooks/useSocketSetup";
import React from "react";

function App() {
  let messageSound = new Howl({
    src: ['/sounds/message-sound.mp3']
  })
  useSocketSetup(messageSound);

  return <ExpandContext>
    <Views />
    <ExpandFilename />
  </ExpandContext>
}

export default App;
