import React ,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Board from '../Board/Board';
import Settings from '../Settings/Settings'
import Analytics from '../Analytics/Analytics';
import logo from '../../assets/codesandbox.png';
import layout from '../../assets/layout.png';
import database from '../../assets/database (2).png';
import setting from '../../assets/settings.png';
import logout from '../../assets/Logout.png';

const Home = () => {
    
    const [activeComponent, setActiveComponent] = useState('Board');
    

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Dashboard':
                return <Board />;
            case 'Analytics':
                return <Analytics />;
            case 'Settings':
                return  <Settings/>;
            default:
                return <Board />;
        }
    };
  return (
    <div className={styles.homePage}>
      <nav className={styles.sidebar}>
      <div>
          <Link className={styles.brand} to="/">
            <img src={logo}/><span>Pro Manage</span></Link>
        </div>
        <ul>
          <li className={activeComponent === 'Board' ? styles.active : ''} onClick={() => setActiveComponent('Board')}>
                      <img src={layout}/> <span>Board</span>
                    </li>
                    <li className={activeComponent === 'Analytics' ? styles.active : ''} onClick={() => setActiveComponent('Analytics')}>
                    <img src={database}/><span>Analytics</span>
                    </li>
                    <li className={activeComponent === 'Settings' ? styles.active : ''} onClick={() => {setActiveComponent('Settings')}}>
                    <img src={setting}/><span>Settings</span>
                    </li>
                    
                    <li className={styles.logout}>
                        <a href="/login" onClick={() => localStorage.clear()}><img src={logout}/><span>Logout</span></a>
                    </li>
        </ul>
      </nav>
      <div className={styles.content}>
      {renderComponent()}
      </div>
    </div>
  );
};

export default Home;