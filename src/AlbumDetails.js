import React, { useState, useEffect } from 'react';
import { Container, Row, Card } from 'react-bootstrap';

const AlbumDetails = ({ albumId, accessToken }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Unable to fetch album tracks');
        }

        const data = await response.json();
        setTracks(data.items);
      } catch (error) {
        setError(error.message);
      }
    };

    if (albumId && accessToken) {
      fetchAlbumTracks();
    }
  }, [albumId, accessToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<Container>
<h2 style={{
  color: '#ff0a54',
  textAlign: 'center',
  position: 'relative',
  textShadow: '0 0 10px rgba(125, 7, 49, 0.8)',
  marginBottom: '15px',
}}>
  Album Tracks
</h2>
  <Row className='mx-2 row'>
    {tracks.map((track, i) => (
      <div key={i} className="col-md-3 mb-4">
        <Card style={{ borderRadius: '20px', margin: '10px', backgroundColor: 'black', boxShadow: '0px 4px 8px rgba(255, 10, 84, 0.3)' }}>
          <Card.Body>
            <Card.Title style={{ color: '#ff0a54', fontSize: '16px', fontWeight: 'bold' }}>{track.name}</Card.Title>
            <Card.Text style={{ color: '#808080' }}>{track.artists.map(artist => artist.name).join(', ')}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    ))}
  </Row>
</Container>
  );
};

export default AlbumDetails;