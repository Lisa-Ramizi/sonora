import React, { useState, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import './styles.css';

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/new-releases');
        const newReleasesData = await response.json();
        console.log('New Releases Data:', newReleasesData);

        setNewReleases(newReleasesData);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };

    fetchNewReleases();
  }, []);

  return (
    <Container>
      <h2 style={{
        color: '#ff0a54',
        textAlign: 'center',
        position: 'relative',
        textShadow: '0 0 10px rgba(125, 7, 49, 0.8)', 
        padding: '15px 0px'
      }}>
        New Releases
      </h2>

      <Row className='mx-2 row'>
        {newReleases.map((album, i) => (
          <div key={i} className="col-md-3 mb-4">
            <Card style={{ width: '300px', height: '350px', margin: '10px', border: 'none', borderRadius: '15px', overflow: 'hidden', backgroundColor: 'black', boxShadow: '0px 4px 8px rgba(255, 10, 84, 0.3)' }}>
              <Card.Img src={album.images[0].url} style={{ width: '100%', height: '70%', objectFit: 'cover', borderBottom: '2px solid #ff0a54' }} />
              <Card.Body style={{ padding: '10px', color: '#808080' }}>
                <Card.Title style={{ fontSize: '12px', fontWeight: 'bold' }}>{album.name}</Card.Title>
                <Card.Text style={{ fontSize: '10px' }}>{album.artists[0].name}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default NewReleases;
