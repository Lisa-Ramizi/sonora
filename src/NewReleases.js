import React, { useState, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchNewReleases = async () => {
      const CLIENT_ID = "a686172c8ab94620a181338642102439";
      const CLIENT_SECRET = "d36335100d00432590d93108ce1c0e62";

      const authParameters = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      };

      try {
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authParameters);
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const newReleasesResponse = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=40', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const newReleasesData = await newReleasesResponse.json();
        console.log('New Releases Data:', newReleasesData);

        setNewReleases(newReleasesData.albums.items);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };

    fetchNewReleases();
  }, []);

  return (
    <Container>
      <h2>New Releases</h2>
      <Row className='mx-2 row row-cols-4'>
        {newReleases.map((album, i) => (
          <Card key={i}>
            <Card.Img src={album.images[0].url} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
              <Card.Text>{album.artists[0].name}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default NewReleases;
