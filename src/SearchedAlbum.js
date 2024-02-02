// SearchedAlbum.js
import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';

const SearchedAlbum = ({ albums }) => {
  return (
    <Container>
      <Row className='mx-2 row row-cols-4'>
        {albums.map((album, i) => (
          <Card key={i}>
            <Card.Img src={album.images[0].url} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default SearchedAlbum;
