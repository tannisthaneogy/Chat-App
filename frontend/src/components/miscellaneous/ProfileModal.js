import { 
    Button, 
    IconButton, 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Text,
    useDisclosure,
    Image
 } from '@chakra-ui/react';
import React from 'react'
import { FaEye } from 'react-icons/fa';

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children? (<span onClick={onOpen}>{children}</span>) : 
      (<IconButton _hover={{ color: 'black'}} display={{ base: "flex" }} backgroundColor='#272727' borderWidth='0.8px' shadow='black 2px 2px' borderColor='#373737' color='white' icon={<FaEye color='white'/>} onClick={onOpen}/>)}

      <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay/>
        <ModalContent h='410px' bg='#171717' color='white'>
            <ModalHeader
            fontSize='36px'
            display='flex'
            justifyContent='center'
            >{user.name}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
            >
                <Image
                border='3px solid'
                borderColor='pink.500'
                borderRadius='full'
                boxSize='150px'
                src={user.pic}
                alt={user.name}
                />
                <Text
                fontSize={{ base: "24px", md: "26px"}}
                >
                    Email: {user.email}
                </Text>
            </ModalBody>
            <ModalFooter>
                {/* <Button colorScheme='pink' mr={3} onClick={onClose}>
                    Close
                </Button> */}
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
