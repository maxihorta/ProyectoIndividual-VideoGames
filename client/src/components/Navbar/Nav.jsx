import './Nav.css';
import { Link } from "react-router-dom";



export default function NavBar() {
    return (
      <header className="navbar">
        <div >
        <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className="logoapp">
             <img src="https://blog.soyhenry.com/content/images/2021/03/151211491_440151970756357_8005198803636550092_o.jpg" width="50px" height="50px" alt=""/>
             <h2 id="letrasdellogo">SoyHenry</h2>
            </div>
         </Link>
        </div>
        <div>
            <Link to="/add" style={{ color: 'inherit', textDecoration: 'inherit'}}>Agregar ➕</Link>
        </div>
      </header>
    );
  }
