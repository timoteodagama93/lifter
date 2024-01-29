import React, { useState } from 'react';
import './PostCard.css';
import { BiCalendar, BiLike, BiDislike, BiShare, BiChat } from 'react-icons/bi';
import { BsSearchHeart, BsThreeDotsVertical } from 'react-icons/bs';
import SecondaryButton from './SecondaryButton';
import axios from 'axios';
import { FaComments } from 'react-icons/fa';
import CommentsSection from './CommentsSection';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

const CardChakraUI = ({ post, setPostToComment }) => {
  function Like(postId) {
    axios
      .post(`/post-like/${postId}`)
      .then(response => {
        if (response.status === 200) {
        }
      })
      .catch(error => {});
  }

  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </Text>
      </CardBody>
      <Image objectFit="cover" src={post.file_url} alt="Chakra UI" />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardChakraUI;
