import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import useSocketSetup from "../../hooks/useSocketSetup";
import { getFriendIndex, getFriendList } from "../../store/chats/selectors";
import { useMediaQuery } from "@chakra-ui/react";
import { Howl } from "howler";

export default function Home() {
  let messageSound = new Howl({
    src: ['/sounds/message-sound.mp3']
  })

  const friendIndex = useSelector(getFriendIndex);
  const friendList = useSelector(getFriendList);

  const [tablet] = useMediaQuery("(max-width: 900px)");
  const [small] = useMediaQuery("(max-width: 700px)");
  const colSpanSidebar = small ? '5' : tablet ? "4" : "3";
  const colSpanChat = small ? '5' : tablet ? "6" : "7";

  useSocketSetup(messageSound);

  return (
    <div>
      <Grid
        templateColumns="repeat(10, 1fr)"
        h="100vh"
        as={Tabs}
        index={friendIndex}
      >
        <GridItem colSpan={colSpanSidebar} borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan={colSpanChat} maxH="100vh">
          <Chat userid={friendList[friendIndex]?.userid} />
        </GridItem>
      </Grid>
    </div>
  );
}
