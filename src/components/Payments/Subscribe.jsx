import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import React, { useState } from 'react';
  import { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { buySubscription } from '../../redux/actions/user';
  import { server } from '../../redux/store';
  import toast from 'react-hot-toast';
  import logo from '../../assets/images/logo.png';
  
  const Subscribe = ({ user }) => {
    const dispatch = useDispatch();
    const [key, setKey] = useState('');
  
    const { loading, error, subscriptionId } = useSelector(
      state => state.subscription
    );
    const { error: courseError } = useSelector(state => state.course);
  
    const subscribeHandler = async () => {
      try {
        const {
          data: { key },
        } = await axios.get(`${server}/razorpaykey`);
  
        setKey(key);
        dispatch(buySubscription());
      } catch (err) {
        toast.error('Error fetching Razorpay key');
      }
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (courseError) {
        toast.error(courseError);
        dispatch({ type: 'clearError' });
      }
      if (subscriptionId) {
        const openPopUp = () => {
          const options = {
            key,
            name: 'CourseBundler',
            description: 'Get access to all premium content',
            image: logo,
            subscription_id: subscriptionId,
            callback_url: `${server}/paymentverification`,
            prefill: {
              name: user?.name || 'Guest',  // Default value if user.name is undefined
              email: user?.email || 'guest@example.com', // Default value if user.email is undefined
              contact: '',
            },
            notes: {
              address: '6 pack programmer at youtube',
            },
            theme: {
              color: '#FFC800',
            },
          };
  
          const razor = new window.Razorpay(options);
          razor.open();
        };
        openPopUp();
      }
    }, [
      dispatch,
      error,
      courseError,
      user?.name,  // Use optional chaining to avoid undefined issues
      user?.email, // Use optional chaining to avoid undefined issues
      key,
      subscriptionId,
    ]);
  
    return (
      <Container h="100vh" p="16">
        <Heading children="Welcome" my="8" textAlign={'center'} />
  
        <VStack
          boxShadow={'lg'}
          alignItems="stretch"
          borderRadius={'lg'}
          spacing="0"
        >
          <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
            <Text color={'black'} children={`Pro Pack - ₹299.00`} />
          </Box>
          <Box p="4">
            <VStack textAlign={'center'} px="8" mt={'4'} spacing="8">
              <Text children={`Join pro pack and get access to all content.`} />
              <Heading size="md" children={'₹299 Only'} />
            </VStack>
  
            <Button
              my="8"
              w="full"
              colorScheme={'yellow'}
              onClick={subscribeHandler}
              isLoading={loading}
            >
              Buy Now
            </Button>
          </Box>
  
          <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
            <Heading
              color={'white'}
              textTransform="uppercase"
              size="sm"
              children={'100% refund at cancellation'}
            />
  
            <Text
              fontSize={'xs'}
              color="white"
              children={'*Terms & Conditions Apply'}
            />
          </Box>
        </VStack>
      </Container>
    );
  };
  
  export default Subscribe;
  