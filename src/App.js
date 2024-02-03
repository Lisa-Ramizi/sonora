import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import CarouselComponent from './CarouselComponent';
import NewReleases from './NewReleases';
import AlbumDetails from './AlbumDetails';
import './styles.css';

const CLIENT_ID = "a686172c8ab94620a181338642102439";
const CLIENT_SECRET = "d36335100d00432590d93108ce1c0e62";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    // API access token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token));
      console.log("access token " + accessToken);
  }, []);


  async function search() {
    console.log("searching for " + searchInput);

    if (!searchInput.trim()) {
      console.error("Search input is empty");
      return;
    }

    // Get request using search to get Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    try {
      var artistID = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=artist`, searchParameters)
        .then(response => response.json())
        .then(data => data.artists.items[0]?.id);

      console.log("artist id is" + artistID);

      // Fetch albums using Artist ID
      if (artistID) {
        var ReturnedAlbums = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
          .then(response => response.json())
          .then(data => setAlbums(data.items));
      }

    } catch (error) {
      console.error("Error fetching artistID:", error);
    }
  }

  // handling more btn
  const handleMoreClick = (albumId) => {
    setSelectedAlbumId(albumId);
  };

  return (
    <div className="App">
      <Container>
        <NewReleases />
      </Container>

      <CarouselComponent />

      <Container>
      <InputGroup style={{ margin: '20px 0px' }} size="lg">
  <FormControl
    placeholder='Search artist name'
    type='input'
    onKeyDown={event => {
      if (event.key === "Enter") {
        search();
      }
    }}
    onChange={event => setSearchInput(event.target.value)}
    style={{
      backgroundColor: '#fffbf6',
      border: '2px solid #ff0a54',
      color: '#343a40',
      borderRadius: '15px',
    }}
  />
  <Button
    style={{
      marginLeft: '10px',
      backgroundColor: '#ff0a54',
      color: '#ffffff',
      border: '2px solid #ff0a54',
      borderRadius: '15px',
    }}
    onClick={search}
  >
    Search
  </Button>
</InputGroup>
        <Row className='mx-2 row row-cols-4'>
  {albums.map((album, i) => (
    <div key={i} className="col mb-4">
      <Card style={{ width: '300px', height: '350px', margin: '10px', border: 'none', borderRadius: '15px', overflow: 'hidden', backgroundColor: 'black', boxShadow: '0px 4px 8px rgba(255, 10, 84, 0.3)' }}>
        <Card.Img src={album.images[0].url} style={{ width: '100%', height: '70%', objectFit: 'cover', borderBottom: '2px solid #ff0a54' }} />
        <Card.Body style={{ padding: '10px', color: '#808080' }}>
          <Card.Title style={{ fontSize: '12px', fontWeight: 'bold' }}>{album.name}</Card.Title>
          <Button style={{ backgroundColor: '#ff0a54', color: '#ffffff', border: 'none', padding: '8px 12px', marginTop: '10px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => handleMoreClick(album.id)}>More</Button>
        </Card.Body>
      </Card>
    </div>
  ))}
</Row>
      </Container>

      {selectedAlbumId && (
        <AlbumDetails albumId={selectedAlbumId} accessToken={accessToken} />
      )}
    </div>
  );
}

export default App;