import React, {useState} from "react";
import {
  Avatar,
  Button, Checkbox, Heading, HStack, Image, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, VStack
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextField from "../../routes/Auth/TextField";
import axios from "axios";
import {useSelector} from "react-redux";
import {getFriendList} from "../../store/chats/selectors";
import styles from "../UserAvatar/style.module.css";

export const ModalCreateGroup = ({
  isOpen, onClose
}) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('')
  const [addedFriendIdxs, setAddedFriendIdxs] = useState([])

  const friendList = useSelector(getFriendList)
  // console.log(friendList)

  return <Modal isOpen={isOpen} onClose={onClose}>
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
            const addedFriends = new Set()
            for (let friend_id of addedFriendIdxs) {
              addedFriends.add(friendList[friend_id]?.userid)
            }
            const vals = {
              ...values,
              addedFriends: [...addedFriends]
            }
            actions.resetForm()

            axios.post(
              `${process.env.REACT_APP_HOST_URL}/group/new`,
              vals,
              { withCredentials: true }
            ).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            }).finally(() => setLoading(false))
          }}
        >
          <VStack as={Form}>
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
                          aspectRatio: "1 / 1",
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
                        setAddedFriendIdxs(prevState => [idx, ...prevState])
                      } else {
                        setAddedFriendIdxs(prevState => [...prevState.filter(id => id !== idx)])
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