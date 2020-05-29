import React from 'react';
import {Link} from 'react-router-dom';

function Menu() {
  return (
    <nav class="light-blue lighten-1" role="navigation">
      <div class="nav-wrapper container">
        <ul class="right hide-on-med-and-down">
          <li><Link className="button" to="/">User</Link></li>
          <li><Link className="button" to="/profile">Profile</Link></li>
          <li><Link className="button" to="/functionalities">Functionalities</Link></li>
        </ul>

        <ul id="nav-mobile" class="sidenav">
          <li><Link className="button" to="/">User</Link></li>
          <li><Link className="button" to="/profile">Profile</Link></li>
          <li><Link className="button" to="/functionalities">Functionalities</Link></li>
        </ul>
        <a data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      </div>
    </nav>
  );
}

export default Menu;