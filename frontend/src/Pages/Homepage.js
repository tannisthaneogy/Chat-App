import React, { useEffect } from 'react';
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/Signup";
import { useHistory } from 'react-router-dom';

const Homepage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) history.push('/chats');
  }, [history]); 
  return (
    <Container maxW='xl' centerContent>
      <Box
      d='flex'
      justifyContent="center"
      p={3}
      bg="#171717"
      w='100%'
      m='40px 0 15px 0'
      borderRadius='lg'>
        <Text
        fontSize='4xl'
        textAlign='center'
        color='white'>Talk-A-Tive</Text>
      </Box>
      <Box bg='#171717'
      w='100%'
      p={4}
      color='white'
      borderRadius='lg'      
      >
        <Tabs variant='soft-rounded' colorScheme='pink'>
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
