import './../component-styles/MainMenu.css'
import './../component-styles/ModalStyles.css'
import { Link } from 'react-router-dom';

const MainMenu = () => { 
    
    return(
        <div>
            <h1 className="menu-title"> Mass Email </h1>
            <section className="menu-section">
                <h2 className="menu-header"> My Lists </h2>
                <Link  className="menu-link" to="/UploadCSV"> Import CSV</Link>
                <button className="menu-button"> View Lists</button>
            </section>
            <section className="menu-section">
                <h2 className="menu-header"> Automations </h2>
                <button className="menu-button"> Manage Automations </button>
                <button className="menu-button"> Create New From List </button>
            </section>

        
        </div>
    )
    
};
export default MainMenu;