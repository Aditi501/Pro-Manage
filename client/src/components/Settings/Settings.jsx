
// import React, { useState } from 'react';
// import styles from './Settings.module.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import { faLock, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

// const Settings = () => {
//   const { updateUser, authToken } = useAuth();
//   const [updateName, setUpdateName] = useState('');
//   const [updateEmail, setUpdateEmail] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
//   const [newPasswordVisible, setNewPasswordVisible] = useState(false);
 

//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setOldPasswordVisible(!oldPasswordVisible);
//   };
//   const toggleConfirmPasswordVisibility = () => {
//     setNewPasswordVisible(!newPasswordVisible);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
   

//     const payload = {
//       name: updateName,
//       email: updateEmail,
//       oldPassword,
//       newPassword
//     };
//     console.log('Submitting update:', { name: updateName, email: updateEmail, oldPassword, newPassword });

//     try {
//      const response= await updateUser(payload);
//      if (response){
//       console.log('Update successful');
//       alert("You have to log in again");}
//       navigate('/login');
//     } catch (error) {
//       if (error.message === 'Incorrect old password') {
//         alert('Incorrect old password. Please try again.');
//       } else {
//         alert('An error occurred while updating the user details.');
//       }
//     }
//   };

//   return (
//     <div>
//       <form className={styles.updateForm} onSubmit={handleSubmit}>
//         <div className={styles.updateInputContainer}>
//           <FontAwesomeIcon icon={faUser} className={styles.icon} />
//           <input
//             type="text"
//             value={updateName}
//             onChange={(e) => setUpdateName(e.target.value)}
//             placeholder='Name'
//           />
//         </div>
//         <div className={styles.updateInputContainer}>
//           <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
//           <input
//             type="email"
//             value={updateEmail}
//             onChange={(e) => setUpdateEmail(e.target.value)}
//             placeholder='Email'
//           />
//         </div>
//         <div className={styles.updateInputContainer}>
//           <FontAwesomeIcon icon={faLock} className={styles.icon} />
//           <input
//             type={oldPasswordVisible ? 'text' : 'password'}
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             placeholder='Old Password'
//           />
//           <FontAwesomeIcon
//             icon={oldPasswordVisible ? faEye : faEyeSlash}
//             className={styles.eyeIcon}
//             onClick={togglePasswordVisibility}
//           />
//         </div>
//         <div className={styles.updateInputContainer}>
//           <FontAwesomeIcon icon={faLock} className={styles.icon} />
//           <input
//             type={newPasswordVisible ? 'text' : 'password'}
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             placeholder='New Password'
//           />
//           <FontAwesomeIcon
//             icon={newPasswordVisible ? faEye : faEyeSlash}
//             className={styles.eyeIcon}
//             onClick={toggleConfirmPasswordVisibility}
//           />
//         </div>
//         <button className={styles.update} type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default Settings;

import React, { useState } from 'react';
import styles from './Settings.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const { updateUser, authToken } = useAuth();
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: updateName,
      email: updateEmail,
      oldPassword,
      newPassword
    };
    console.log('Submitting update:', { name: updateName, email: updateEmail, oldPassword, newPassword });

    try {
      const response = await updateUser(payload);
      if (response) {
        console.log('Update successful');
        alert("You have to log in again");
        localStorage.clear();
        navigate('/login');
      }
      else{
        alert("Invalid old password")
      }
    } catch (error) {
      setError(error.message);
      alert(error.message)
    }
  };

  return (
    <div>
      <form className={styles.updateForm} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.updateInputContainer}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            placeholder='Name'
          />
        </div>
        <div className={styles.updateInputContainer}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input
            type="email"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            placeholder='Email'
          />
        </div>
        <div className={styles.updateInputContainer}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
            type={oldPasswordVisible ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder='Old Password'
          />
          <FontAwesomeIcon
            icon={oldPasswordVisible ? faEye : faEyeSlash}
            className={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className={styles.updateInputContainer}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
            type={newPasswordVisible ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='New Password'
          />
          <FontAwesomeIcon
            icon={newPasswordVisible ? faEye : faEyeSlash}
            className={styles.eyeIcon}
            onClick={toggleConfirmPasswordVisibility}
          />
        </div>
        <button className={styles.update} type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;

