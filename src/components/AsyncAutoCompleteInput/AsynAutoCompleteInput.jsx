import React, { Component, Fragment } from "react";
import axios from 'axios';
import debounce from 'lodash.debounce';
import './index.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIdx: 0,
      options: [],
      hasError: false,
      showSuggestions: false,
      userInput: ''
    };

    this.search = debounce(this.search.bind(this), 1500);
  }

  onChange = (e) => {
    e.persist();
    const userInput = e.target.value;
     this.setState({
       userInput,
     })

     if (userInput !== '') {
       this.search(userInput)
     }
  };

  search = (q) => {
     const {
       dataSource: {
         httpRequest,
         transform
       }
     } = this.props;


    const requestOptions = httpRequest(q);
    axios(requestOptions).then(({ data }) => {
      let options = data;
      if (transform) {
        options = transform(options);
      }

      this.setState({
        selectedIdx: 0,
        options,
        hasError: false,
        showSuggestions: true,
      });
    }).catch((error) => {
      this.setState({
        hasError: true
      })
    })
  }

  onClick = e => {
    this.setState({
      selectedIdx: 0,
      options: [],
      showSuggestions: false,
      hasError: false,
      userInput: e.target.innerText
    });
  };

  onKeyDown = e => {
    const { selectedIdx, options } = this.state;
    const { onEnter } = this.props;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        selectedIdx: 0,
        showSuggestions: false,
        userInput: options[selectedIdx]
      });
      onEnter(this.state.userInput);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (selectedIdx === 0) {
        return;
      }

      this.setState({ selectedIdx: selectedIdx - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (selectedIdx - 1 === options.length) {
        return;
      }

      this.setState({ selectedIdx: selectedIdx + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        selectedIdx,
        options,
        showSuggestions,
        userInput,
        hasError
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (options.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {options.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === selectedIdx) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
        {hasError && (
          <div className="error-loading-suggestions" >
            <em> Sorry, something went wrong.Please try again</em>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Autocomplete;
