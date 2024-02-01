import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'; 
import { useState, useEffect } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="App">
        <Container>
          <InputGroup className="mb-3" size="lg">
            <FormControl placeholder='Search song or artist' type='input' onKeyDown={event => {
              if (event.key =="Enter"){
                console.log("pressed enter")
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
            />
            <Button onClick={event => {console.log("hello")}}>
              Search
            </Button>
          </InputGroup>
        </Container>
        <Container>
          <Card>
            <Card.Img src="#"/>
            <Card.Body>
              <Card.Title>Album Name here</Card.Title>
            </Card.Body>
          </Card>
        </Container>
    </div>
  );
}

export default App;
