import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-blue.svg';

const AppLogo = () => (
  <div>
    <Link to="/" className="d-inline-block">
      <img
        src={logo}
        alt="Cosmoscan"
        width="35"
        height="35"
      />
    </Link>
  </div>
);

export default AppLogo;
