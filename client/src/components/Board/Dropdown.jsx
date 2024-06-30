import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Edit from './Edit';

const Dropdown = ({taskId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete,setIsDelete]=useState(false);
  const {deleteTask} =useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const naviagte = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = async () => {
    try {
      await deleteTask(taskId)
      setIsDelete(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  
  };
  const handleShare=(taskId)=>{
    naviagte(`/share/${taskId}`)
  }

  const handleEdit = () => {
    setIsEditModalOpen(true); 
    setIsOpen(false);
    console.log("edit")
  };

  return (
    <div className={styles.DropdownContainer}>
       {isEditModalOpen && (
        <Edit isOpen={true} onClose={() => setIsEditModalOpen(false)} taskId={taskId} />
      )}

     {isDelete && (
        <div className={styles.delModal}>
            <div className={styles.delContent}>
                <h5>Are you confirm you want to delete ?</h5>
                <div className={styles.btnflexBox}>
                    <button style={{background:"#FF4B4B",color:"white"}} onClick={()=>handleDelete(taskId)}>Confirm Delete</button>
                    <button style={{background:"white",color:"#474444",boxShadow:"0px 0px 15px 0px #00000040"}}
                     onClick={()=>setIsDelete(false)}>Cancel</button>
                    </div>
            </div>
        </div>
      )}
    <div className={styles.dropdown}>
      <button onClick={toggleMenu} className={styles.menuButton}>⋯</button>
      {isOpen && (
        <div className={styles.menu}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={()=>{handleShare(taskId); localStorage.setItem('currTaskId',taskId)}}>Share</button>
          <button onClick={() =>{ setIsDelete(true);setIsOpen(false)}} className={styles.delete}>Delete</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Dropdown;
