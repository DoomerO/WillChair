import Footer from "../components/Footer";
import { Box, Flex, Heading, Stack, Text,} from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io"
import { BsFacebook } from "react-icons/bs"
import { ImInstagram } from "react-icons/im"
import HeaderToggle from '../components/toggles/HeaderToggle';
import { Link } from "react-router-dom";
import "../fonts/fonts.css"
import React, { useState } from 'react';
import { VStack, Text, IconButton } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface RatingProps {
  maxStars: number;
}

const Rating: React.FC<RatingProps> = ({ maxStars }) => {
  const [rating, setRating] = useState(0);

  return (
    <VStack align="center">
      <Text fontSize="lg" fontWeight="bold">
        Rate this:
      </Text>
      <div>
        {[...Array(maxStars)].map((_, index) => (
          <IconButton
            key={index}
            onClick={() => setRating(index + 1)}
            icon={index < rating ? <AiFillStar /> : <AiOutlineStar />}
            colorScheme={index < rating ? 'yellow' : 'gray'}
          />
        ))}
      </div>
    </VStack>
  );
};

export default Rating;