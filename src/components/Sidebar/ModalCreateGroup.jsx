import React, {useContext, useState} from "react";
import {
  Avatar,
  Button, Checkbox, Heading, HStack, Image, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Text, VStack
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextField from "../../routes/Auth/TextField";
import {useSelector} from "react-redux";
import {getFriendList} from "../../store/chats/selectors";
import styles from "../UserAvatar/style.module.css";
import socket from "../../socket";
import {AccountContext} from "../AccountContext";
import {useActions} from "../../hooks/useActions";

export const ModalCreateGroup = ({
  isOpen, onClose
}) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [addedFriendIdxs, setAddedFriendIdxs] = useState([])

  const { user } = useContext(AccountContext);
  const friendList = useSelector(getFriendList);
  const { addGroup } = useActions();

  return <Modal isOpen={isOpen} onClose={() => {
    setAddedFriendIdxs([])
    onClose()
  }}>
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>Create group</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Formik
          initialValues={{name: ""}}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Name required')
              .min(3, 'short name!')
              .max(67, "Name is too long")
          })}
          onSubmit={(values, actions) => {
            setLoading(true)
            actions.resetForm()

            socket.emit('new_group', {
              ...values,
              addedFriends: [...new Set(addedFriendIdxs), user.userid]
            }, async data => {
              setLoading(false)
              if (data.done) {
                await addGroup(data.group)
                setAddedFriendIdxs([])
                onClose()
              }
            })
          }}
        >
          <VStack as={Form}>
            <Text as="p" color="red.500">
              {error}
            </Text>
            <HStack
              m="auto" justify="center" alignItems='center'
              w={{base: "96%"}} spacing="1rem"
            >
              <TextField
                name="name"
                placeholder="Type name of group"
                autoComplete="off"
                label="Name"
              />
            </HStack>
            <HStack
              m="auto" justify="flex-end" alignItems='center'
              w={{base: "96%"}} spacing="1rem"
            >
              <Button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Create'}
              </Button>
            </HStack>
            <VStack w='95%' style={{marginTop: 24}}>
              <Input mb={2}
                onChange={e => setFilter(e.target.value.toLowerCase())}
                placeholder="Search friend"
                w='100%'
              />
              {friendList
                .filter(user => user.username.toLowerCase().includes(filter))
                .map((friend, idx) =>
                <HStack key={idx} px={2} w='100%' justifyContent='space-between'>
                  <HStack justifyContent='flex-start' w='100%'>
                    {friend?.avatar ?
                      <Image
                        style={{
                          width: 44,
                          aspectRatio: "1/1",
                        }}
                        className={styles["avatar-image"]}
                        crossOrigin="anonymous"
                        src={`${process.env.REACT_APP_HOST_URL}/images/avatars/${friend?.avatar}`}
                      />
                      : <Avatar
                        size='sm'
                        cursor="pointer"
                        className={styles.avatar}
                        name={friend.username}
                      />
                    }
                    <Heading
                      fontSize="md"
                      wordBreak="break-all"
                    >
                      {friend?.username}
                    </Heading>
                  </HStack>
                  <Checkbox
                    onChange={e => {
                      if (e.target.checked) {
                        setAddedFriendIdxs(prevState => [friend.userid, ...prevState])
                      } else {
                        setAddedFriendIdxs(prevState => [...prevState.filter(id => id !== friend.userid)])
                      }
                    }}
                  />
                </HStack>
              )}
            </VStack>
          </VStack>
        </Formik>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </ModalContent>
  </Modal>
}