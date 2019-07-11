import React, { useState } from 'react';
import style from './App.module.css';

const SuggestionEntry = ({ person }) => (
  <dl className={style.suggestionEntry}>
    <dt className={style.suggestionKey}>First name:</dt>
    <dd className={style.suggestionValue}>{ person.name.first }</dd>
    <dt className={style.suggestionKey}>Last name:</dt>
    <dd className={style.suggestionValue}>{ person.name.last }</dd>
  </dl>
);

function App() {
  const [personsList, setPersonsList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchUserData = () => {
    const url = `https://randomuser.me/api/?results=${inputValue}`;

    setIsFetching(true);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw Error(response.statusText);
      })
      .then((data) => {
        const { results } = data;

        setPersonsList(results);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    fetchUserData();
  };

  return (
    <div className={style.App}>
      <h1 className={style.title}>Search</h1>

      <form
        className={style.form}
        onSubmit={handleSubmit}
        action="post"
        method="post"
        autoComplete="off"
      >
        <fieldset className={style.formRow}>
          <input
            className={style.field}
            value={inputValue}
            onChange={handleChange}
            type="search"
            autoComplete="false"
            placeholder="Please enter number of entries to show"
            disabled={isFetching ? 'disabled' : false}
            pattern="[0-9]*"
          />
          <button className={style.button} type="submit">Search</button>
        </fieldset>
        { isFetching === true && <span>Loading!!!</span> }
        { (personsList.length > 0) && (
          <ul className={style.suggestions}>
            { personsList.map(person => (
              <li className={style.suggestion} key={person.login.uuid}>
                <SuggestionEntry person={person} />
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default App;
