import Footer from "../components/Footer";
import { Box, Flex, Heading, Stack, Text,} from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io"   
import HeaderToggle from '../components/toggles/HeaderToggle';
import { Link } from "react-router-dom";
import "../fonts/fonts.css"
import React, { useState } from 'react';
import { VStack, Text, IconButton } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface RatingProps {
  maxStars: number;
}
import React, { useState } from 'react';
import { VStack, Text, IconButton, Button } from '@chakra-ui/react';
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
 //
    console.log(`Enviando avaliação: ${rating}`);
  };

  return (
    <VStack align="center" spacing="4">
      <Text fontSize="lg" fontWeight="bold">
        Avalie este usuário
      </Text>
      <Text fontSize="md">
        {rating > 0 ? `Você avaliou com ${rating} estrela(s)` : 'Selecione uma avaliação'}
      </Text>
      <div>
        {[...Array(maxStars)].map((_, index) => (
          <IconButton
            key={index}
            onClick={() => handleRatingClick(index + 1)}
            icon={index < rating ? <AiFillStar /> : <AiOutlineStar />}
            colorScheme={index < rating ? 'yellow' : 'gray'}
          />
        ))}
      </div>
      <Button colorScheme="blue" onClick={handleSubmitRating} disabled={rating === 0}>
        Enviar Avaliação
      </Button>
    </VStack>
  );
};

export default Rating;
