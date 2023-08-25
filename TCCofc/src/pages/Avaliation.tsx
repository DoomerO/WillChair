import Footer from "../components/Footer";
import { Box, Flex, Heading, Stack, Text,} from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io"   
import HeaderToggle from '../components/toggles/HeaderToggle';
import { Link } from "react-router-dom";
import "../fonts/fonts.css"
import React, { useState } from 'react';
import { VStack, Text, IconButton } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import React, { useState } from 'react';
import { VStack, Text, IconButton, Button, HStack } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface RatingProps {
  maxStars: number;
}

const Rating: React.FC<RatingProps> = ({ maxStars }) => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitRating = () => {
    if (rating > 0) {
      // Substitua esta parte pela lógica de envio da avaliação para o backend
      console.log(`Enviando avaliação: ${rating}`);
    }
  };

  const handleCancelRating = () => {
    setRating(0);
  };

  return (
    <VStack spacing={4} alignItems="center">
      <VStack spacing={2} alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Avalie este usuário
        </Text>
        <Text fontSize="md">
          {rating > 0 ? `Você avaliou com ${rating} estrela(s)` : 'Selecione uma avaliação'}
        </Text>
        <HStack spacing={2}>
          {[...Array(maxStars)].map((_, index) => (
            <IconButton
              key={index}
              onClick={() => handleRatingClick(index + 1)}
              icon={index < rating ? <AiFillStar color="blue" /> : <AiOutlineStar />}
              colorScheme={index < rating ? 'yellow' : 'gray'}
            />
          ))}
        </HStack>
      </VStack>
      <HStack spacing={4}>
        <Button colorScheme="red" onClick={handleCancelRating}>
          Cancelar
        </Button>
        <Button colorScheme="blue" onClick={handleSubmitRating} disabled={rating === 0}>
          Enviar Avaliação
        </Button>
      </HStack>
    </VStack>
  );
};

export default Rating;

