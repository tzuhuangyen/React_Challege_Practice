import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import './assets/styles/all.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(
      import.meta.env.VITE_REACT_APP_API_URL,
      import.meta.env.VITE_REACT_APP_API_PATH
    );
    (async () => {
      const res = await axios.get(
        `/v2/api/${import.meta.env.VITE_REACT_APP_API_PATH}/products/all`
      );
      console.log(res);
    })();
  }, []);

  return (
    <>
      <div>
        <h3>React Challege Practice</h3>
        <h4> this is a react app with vite and bootstrap</h4>
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              Navbar
            </a>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNavDropdown'
              aria-controls='navbarNavDropdown'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNavDropdown'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='#'>
                    Home
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Features
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Pricing
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Dropdown link
                  </a>
                  <ul className='dropdown-menu'>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Action
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
