import { 
    Box, 
    Button, 
    Drawer, 
    DrawerBody, 
    DrawerContent, 
    DrawerHeader, 
    DrawerOverlay, 
    Input, 
    Menu, 
    MenuButton, 
    MenuItem, 
    MenuList, 
    Spinner, 
    Text, 
    Tooltip, 
    useToast,
    Avatar,
    useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge, { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();  
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push('/');
  };

  const handleSearch = async (userId) => {
    if(!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`,config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to lead the search result",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post('/api/chat',{userId},config);
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat!",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: 'bottom-left',
      });
    }    
  };

  return (
    <>
    <Box
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    bg='#171717'
    w='100%'
    p='5px 10px 5px 10px'
    >
      <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
        <Button variant='ghost' _hover={{ bg: '#212121' }} onClick={onOpen}>
        <IoSearch color='white' size='1.2em'/>
          <Text display={{base: "none", md: "flex"}} px='3' color='white'>
            Search User
          </Text>
        </Button>
      </Tooltip>
      <Text fontSize='2xl' fontFamily='Work sans' color='white'>
        Talk-A-Tive
      </Text>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Menu>
          <MenuButton p={2}>
            <NotificationBadge
            count={notification.length}
            effect={Effect.SCALE}
            />
            <FaBell color='white'/>
          </MenuButton>
          <MenuList pl={2} bg='#171717' borderColor='#232323' color='white' borderWidth={2} mt={2}>
            {!notification.length && "No New Messages"}
            {notification.map((notif) => (
              <MenuItem key={notif._id} bgColor='#171717' color='white' onClick={() => {
                setSelectedChat(notif.chat);

                // Filter out all notifications from the same chat or sender
                const filteredNotifications = notification.filter((n) => n.chat._id !== notif.chat._id);
                setNotification(filteredNotifications);
              }}>
                {notif.chat.isGroupChat
                 ? `New Message in ${notif.chat.chatName}`
                 :`New Message from ${getSender(user,notif.chat.users)}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton variant='ghost' sx={{_hover: { backgroundColor: '#171717' }}} px={3}>
            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
          </MenuButton>
          <MenuList bg='#171717' borderColor='#232323' color='white' borderWidth={2} mt={2}>
              <ProfileModal user={user}>
                <MenuItem _hover={{ bg: '#212121' }} bgColor='#171717' color='white'>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem _hover={{ bg: '#212121' }} bgColor='#171717' color='white' onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
        </Menu>
      </div>
    </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay/>
      <DrawerContent bg='#171717' color='white'>
        <DrawerHeader borderBottomWidth='1px' borderColor='#232323'>Search Users</DrawerHeader>
        <DrawerBody>
          <Box display='flex' pb={2}>
            <Input
            placeholder='Search by name or email'
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            focusBorderColor='pink.300'
            />
            <Button
            bg='pink.500'
            color='white' 
            onClick={handleSearch}
            >Go</Button>
          </Box>
          {loading? (
            <ChatLoading/>
          ):(
            searchResult?.map(user => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner ml='auto' display='flex'/>}
      </DrawerBody>
      </DrawerContent>      
    </Drawer>
    </>
  )
}

export default SideDrawer
