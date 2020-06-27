// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AsyncAutoCompleteInput from '../../components/AsyncAutoCompleteInput';

class SearchPage extends React.Component {
  state = {
    isLoading: false,
    results: []
  }

  onEnter = (q) => {
    this.setState({
      isLoading: true
    })
    axios({
      method: 'GET',
      url: `https://api.github.com/search/users?q=${q}`,
      headers: {
        Accept: 'application/vnd.github.v3+json'
      },
    }).then(({ data }) => {
        const results = data.items.map(item => ({
          name: item.login,
          avatar_url: item.avatar_url
        }));

        this.setState({
          results,
          isLoading: false
        })
    }).catch((error) => {
       this.setState({
         isLoading: false
       })
    })
  }

  render() {
    let resultsSection = null;

    if (this.state.results && this.state.results.length > 0) {
      resultsSection = this.state.results.map(r => {
        return (
          <ul>
            <li key={r.name} >
             <Link to={`/users/${r.name}`} >
              <span >
                <img src={r.avatar_url}/ >
              </span>
              {r.name}
             </Link>
            </li>
          </ul>
        )
      })
    }

    return (
      <div>
        <h1>Find Me In Github</h1>
        <h2>Start typing Github username you want to find</h2>
        <AsyncAutoCompleteInput
          dataSource={{
            httpRequest: (input) => ({
              method: 'GET',
              url: `https://api.github.com/search/users?q=${input}`,
              headers: {
                Accept: 'application/vnd.github.v3+json'
              },
            }),
            transform: (responseData) => responseData.items.map(i => i.login)
          }}
          onEnter={this.onEnter}
        />
        {resultsSection}
      </div>
    );
  }
}

export default SearchPage;
