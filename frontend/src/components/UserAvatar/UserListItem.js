import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
    onClick={handleFunction}
    cursor='pointer'
    bg='#212121'
    _hover={{
        background: "#252525",
        color: "#fff",
    }}
    w='100%'
    display='flex'
    alignItems='center'
    color='white'
    px={3}
    py={2}
    my={2}
    borderRadius='lg'
    >
        <Avatar
        mr={2}
        size='sm'
        cursor='pointer'
        name={user.name}
        src={user.pic}
        />
        <Box>
            <Text>{user.name}</Text>
            <Text fontSize='xs'>
                <b>Email: </b>
                {user.email}
            </Text>
        </Box>
    </Box>
  );
};

export default UserListItem
