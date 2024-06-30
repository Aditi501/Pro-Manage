
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login/Login.module.css';
import { useNavigate } from 'react-router-dom';
import art from '../../assets/Art.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock,faEye, faEyeSlash,faUser} from '@fortawesome/free-solid-svg-icons';

function Login() {
  const { registerUser } = useAuth();
  const [name,setName]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

 const navigate=useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors={}
    if(!name) errors.name="Name Required";
    if (!email) errors.email = 'Email Required';
    if (!password) errors.password = 'Password Required';
    if (!confirmPassword) errors.confirmPassword = 'Confirm your password';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    setErrors(errors);
    
    if (Object.keys(errors).length === 0) {
        try {
          await registerUser({ name, email, password, confirmPassword });
          console.log('Registration successful');
          navigate('/login')
        } catch (error) {
          console.error('Registration failed:', error);
          
        }
      }
  
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.right}>
        <div className={styles.circle}></div>
        <img src={art} alt="Art" />
        <div className={styles.welcomeText}>
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h1>Register</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={errors.name ? errors.name : 'Name'}
            className={errors.name ? styles.invalid : ''}
          />
        </div>
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
            icon={passwordVisible ? faEye: faEyeSlash}
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className={styles.inputContainer}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
             type={confirmPasswordVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={errors.confirmPassword ? errors.confirmPassword : 'Confirm Password'}
            className={errors.confirmPassword ? styles.invalid : ''}
          />
           <FontAwesomeIcon
            icon={confirmPasswordVisible ? faEye: faEyeSlash}
            className={styles.eyeIcon}
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>

        <button className={styles.login} type="submit">Register</button>
        <p>Have an account ?</p>
         <button onClick={()=>navigate('/login')} className={styles.Register} type="submit">Log in</button>
      </form>
      </div>
    </div>
  );
}

export default Login;

