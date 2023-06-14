import React, { useState } from 'react';
import {auth} from '../../../firebase';
import './index.css';
import {useHistory} from 'react-router-dom';

const DropdownButton = ({ title, options,image }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleOptionClick = (option) => {
    // Lakukan sesuatu saat opsi dipilih
    if (option == 'Logout') {
      auth.signOut();
      history.push('/');
    }
    // console.log('Option selected:', option);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__button" onClick={handleToggle}>
        <img src={image}/>
        {title}
        <div className="dot">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown__menu">
          {options.map((option) => (
            <li
              key={option}
              className="dropdown__menu-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
