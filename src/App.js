import React, { useState } from 'react';
import style from './App.module.css';

function App() {
  const [personsList, setPersonsList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  let isFetching = false;

  const fetchUserData = () => {
    const personCount = Math.floor(Math.random() * 10) + 1;
    const url = `https://randomuser.me/api/?results=${personCount}`;

    isFetching = true;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const { results } = data

        console.log(results);

        setPersonsList(results);
        isFetching = false;
      });
  }

  const handleChange = (event) => {
    const value = event.target.value;

    setInputValue(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchUserData();
  }

  return (
    <div className={ style.App }>
      <form
        className={ style.form }
        onSubmit={ handleSubmit }
        action="post"
        method="post"
        autoComplete="off"
      >
        <h1 className={ style.title }>Search</h1>
        <fieldset className={ style.formRow }>
          <input
            className={ style.field }
            value={ inputValue }
            onChange={ handleChange }
            type="search"
            autoComplete="false"
            placeholder="Please enter number of entries to show"
            disabled={ isFetching ? 'disabled': false }
          />
          <button className={ style.button } type="submit">Search</button>
        </fieldset>
        { isFetching && <span>Loading!!!</span> }
        { (personsList.length > 0) && (
          <ul className={ style.suggestions }>
            { personsList.map((person, index) => (
              <li className={ style.suggestion } key={ index }>
                <span className={ style.suggestionEntry }>{ person.name.first }</span>
                <span className={ style.suggestionEntry }>{ person.name.last }</span>
                <span className={ style.suggestionEntry }>{ person.email }</span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default App;
