import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LOGO from '../../images/logo.png';

// import './Header.css';

const Header = ({ children }) => {
  let history = useHistory();

  const searchTypes = {
    ZIP: 'zip',
    DEFAULT: '',
  };

  const [searchType, setSeachType] = useState(searchTypes.DEFAULT);
  const [search, setSearch] = useState('');


  const onSubmit = e => {
    e.preventDefault();
    if (search) {
      switch (searchType) {
        case searchTypes.ZIP:
        default:
          history.replace({
            pathname: '/weather-app/weather/zip',
            search: `?search=${search}`,
          });
          setSearch('');
          break;
      };
    }
  }

  const handleInputChange = e => {
    switch (searchType) {
      case searchTypes.ZIP:
      default:
        setSearch(isNaN(parseInt(e.target.value.substr(0, 12))) ? '' : parseInt(e.target.value.substr(0, 12)).toString());
        break;
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link className='navbar-brand' to='/weather-app/'>
        <img className='navbar_logo' src={LOGO} alt='logo' />
      </Link>
      {children}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          {children}
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/DevAidar/weather-app">GitHub</a>
          </li>
        </ul>
        <form className="form-inline mt-2 mt-md-0" onSubmit={e => onSubmit(e)}>
          <div className='input-group'>
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{searchType ? searchType[0].toUpperCase() + searchType.substr(1).toLowerCase() : 'Zip'}</button>
              <div className="dropdown-menu">
                <a className="dropdown-item"><button className='reset_styling' onClick={() => setSeachType('zip')}>Zip</button></a>
              </div>
            </div>
            <input className="form-control" type="text" placeholder="Search" aria-label="Search" name='search' value={search} onChange={e => handleInputChange(e)} />
          </div>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Header;