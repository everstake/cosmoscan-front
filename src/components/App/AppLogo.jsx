import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-blue.svg';
import Store from '../../store';

const AppLogo = () => {
  const { chain } = useContext(Store);
  return (
    <div>
      <Link to={`/${chain.value}`} className="d-inline-block">
        <img src={logo} alt="Cosmoscan" width="35" height="35" />
      </Link>
    </div>
  );
};

export default AppLogo;
