import React from 'react';
import { ChatState } from "../Context/ChatProvider"; 
import { Box } from "@chakra-ui/react";
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
    display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
    alignItems='center'
    flexDir='column'
    p={3}
    bg='#171717'
    w={{ base: "100%", md: "68%" }}
    borderRadius='lg'
    borderWidth='0.5px'
    color='white'
    borderColor='#F4E8C0'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
