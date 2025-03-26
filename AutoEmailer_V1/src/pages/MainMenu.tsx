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
                <Link className='menu-link' to = "/ViewList">View List</Link>
            </section>
            <section className="menu-section">
                <h2 className="menu-header"> Automations </h2>
                <Link className="menu-link" to ="/ManageAutomations"> Manage Automations </Link>
                <Link className='menu-link' to = "/CreateAutomation">Create New From List</Link>
            </section>

        
        </div>
    )
    
};
export default MainMenu;