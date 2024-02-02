import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import CarouselComponent from './CarouselComponent';
import SearchedAlbum from './SearchedAlbum';
import NewReleases from './NewReleases';

const CLIENT_ID = "a686172c8ab94620a181338642102439";
const CLIENT_SECRET = "d36335100d00432590d93108ce1c0e62";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

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

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder='Search song or artist'
            type='input'
            onKeyDown={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>

      <CarouselComponent />
      <NewReleases />

      <SearchedAlbum albums={albums} />
    </div>
  );
}

export default App;
