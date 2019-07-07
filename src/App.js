import React from 'react';
import style from './App.module.css';

function App() {
  return (
    <div className={ style.App }>
      <form className={ style.form } action="post" method="post" autocomplete="off">
        <h1 className={ style.title }>Person search</h1>
        <fieldset className={ style.formRow }>
          <input className={ style.field } type="search" autocomplete="false" value="" />
          <button className={ style.button } type="submit">Search</button>
        </fieldset>
        <ul className={ style.suggestions }>
          <li className={ style.suggestion }>Test</li>
        </ul>
      </form>
    </div>
  );
}

export default App;
