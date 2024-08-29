import { Box } from '@chakra-ui/react'
import React from 'react'
import { IoIosClose } from "react-icons/io";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius='md'
    m={1}
    mb={2}
    variant='solid'
    fontSize={12}
    backgroundColor='pink.200'
    cursor='pointer'
    onClick={handleFunction}
    display='flex'
    alignItems='center'
    gap={1}
    color='black'
    >
        {user.name}
        <IoIosClose />
    </Box>
  )
}

export default UserBadgeItem
