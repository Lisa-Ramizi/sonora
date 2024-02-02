// CarouselComponent.js
import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent = () => {
  const artistImages = Array.from({ length: 14 }, (_, index) => `${process.env.PUBLIC_URL}/images/${index + 1}.jpg`);

  return (
    <Carousel style={{ height: '70vh' }}>
      {artistImages.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} style={{ maxHeight: '70vh', objectFit: 'cover' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
