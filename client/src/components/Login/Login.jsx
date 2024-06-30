
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import art from '../../assets/Art.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock,faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

function Login() {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const naviagte=useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors={}
    if (!email) errors.email = 'Email Required';
    if (!password) errors.password = 'Password Required';
    setErrors(errors);
    
    try {
      const response=await loginUser({ email, password });
      console.log('Login successful:',response);
      if(response)naviagte('/')
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.right}>
        <div className={styles.circle}></div>
        <img className={styles.ArtImg} src={art} alt="Art" />
        <div className={styles.welcomeText}>
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={errors.email ? errors.email : 'Email'}
            className={errors.email ? styles.invalid : ''}
          />
        </div>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
             type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={errors.password ? errors.password : 'Password'}
            className={errors.password ? styles.invalid : ''}
          />
           <FontAwesomeIcon
            icon={passwordVisible ? faEyeSlash : faEye}
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        <button className={styles.login} type="submit" >Log In</button>
        <p>Have no account yet?</p>
         <button onClick={()=>naviagte('/register')} className={styles.Register} type="submit">Register</button>
      </form>
      </div>
    </div>
  );
}

export default Login;

