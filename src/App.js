import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Search from './Search';
import Graph from './Graph';

const App = () => {
  return (
    <Container>
      <Box my={1}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>COVID-19 Papers</Typography>
        <Search />
        <Graph />
      </Box>
    </Container>
  );
}

export default App;
