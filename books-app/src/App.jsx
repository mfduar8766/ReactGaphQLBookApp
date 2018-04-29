import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

import BookList from './Components/BookList';
import AddBook from './Components/AddBook';

const provider = new ApolloClient({
  uri: `http://localhost:4000/graphql`
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={provider}>
        <div id="main">
          <h1>BookList</h1>
          <BookList/>
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
