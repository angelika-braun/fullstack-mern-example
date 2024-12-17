import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
      const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <>
     {
                isAuthenticated ? (
                    <header>
                        <nav>
                            <NavLink to="/posts">All posts</NavLink>
                            <NavLink to="/account/posts">My posts</NavLink>
                            <NavLink to="/newpost">New post</NavLink>
                        </nav>
                        <button className="button-secondary" onClick={logout}>Logout</button>
                    </header> 
                )  : null 
            }      
    </>
  )
}

export default Header

