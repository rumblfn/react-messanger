import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AccountContext } from "../../../../components/AccountContext";

export const AboutMeBox = ({ text }) => {
  const [editable, setEditable] = useState(false);
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState("");
  const textRef = useRef();

  const reset = () => {
    setEditable(false);
    setError("");
    textRef.current.innerText = text;
  };

  const editOn = () => {
    setError("");
    setEditable(true);
  };

  const handleEdit = () => {
    setEditable(false);

    const about = textRef.current.innerText;

    if (about === text) {
      return;
    }

    fetch(`${process.env.REACT_APP_HOST_URL}/user/update-description`, {
      method: "POST",
      body: JSON.stringify({
        about
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUser((user) => ({
            ...user,
            description: data.about,
          }));
        } else if (data.status === "error") {
          setError("Some errors on server");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box w="80%" style={{ marginLeft: "auto", marginRight: "auto" }}>
      <HStack>
        <Heading size="md" mb={2}>
          About me
        </Heading>
        <Spacer />
        {editable ? (
          <>
            <CloseIcon onClick={reset} cursor="pointer" />
            <CheckIcon onClick={handleEdit} cursor="pointer" />
          </>
        ) : (
          <EditIcon onClick={editOn} cursor="pointer" />
        )}
      </HStack>
      <Box
        ref={textRef}
        w="100%"
        style={{ wordBreak: "break-all" }}
        contentEditable={editable}
        suppressContentEditableWarning={true}
        wordBreak="break-all"
        borderRadius="12px"
        minH="200px"
        padding="0.5rem 1rem"
        boxShadow={editable ? "outline" : "lg"}
        placeholder="Type something about you"
      >
        {text}
      </Box>
    </Box>
  );
};
