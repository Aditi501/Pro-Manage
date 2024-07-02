import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatDate';
import TaskColumn from './TaskColumn';
import styles from './Board.module.css';
import down from '../../assets/Vector 14.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

const Board = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [memberEmail, setMemberEmail] = useState('');
  const today = new Date();
  const { filtered, filteredTasks, email, authToken,filter,setFilter,name,addPeople} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      if (authToken && email) {
        setLoading(true);
        try {
          console.log("Fetching tasks with filter:", filter);
          await filteredTasks(filter, email);
        } catch (error) {
          console.log("Error fetching tasks:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTasks();
  }, [filter, email, authToken, filteredTasks]);

  const handleFilterChange = (e) => {
    console.log("Filter changed to:", e.target.value);
    setFilter(e.target.value);
  };

  const displayTasks = filtered || [];

  const filterTasks = (status) => {
    return displayTasks.filter((task) => task && task.status === status);
  };
  console.log("Filtered tasks:", displayTasks);

  const handleAddMember = async () => {
    try {
      console.log('Attempting to add member with email:',memberEmail);
      const response = await addPeople(memberEmail); 
      console.log('Member added successfully:', response);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };



  return (
    <div className={styles.BoardContainer}>
       {isModalOpen && (
        <div  style={{ display: showSuccessModal? 'none' : '' }} className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add people to the board</h2>
            <input
              type="email"
              value={memberEmail}
              onChange={(e) => {setMemberEmail(e.target.value); console.log(e.target.value)}}
              placeholder="Enter the email"
            />
            <button onClick={() => setIsModalOpen(false)} style={{background:"transparent",border:"1px solid #CF3636",color:"#CF3636"}}>Cancel</button>
            <button onClick={handleAddMember} style={{background:"#17A2B8",border:"none",color:"white"}}>Add Email</button>
          </div>
        </div>
      )}

      {
        showSuccessModal &&(
          <div className={styles.successModal}>
          <div className={styles.successModalContent}>
           <h2>{memberEmail}</h2>
           <button onClick={()=>{;setIsModalOpen(false);setShowSuccessModal(false)}} style={{background:"#17A2B8",border:"none",color:"white"}}>ok, got it!</button>
          </div>
        </div>
        )
      }
      <div className={styles.section1}>
        <h3>Welcome {name}!</h3>
        <p>{formatDate(today)}</p>
      </div>
      <div className={styles.section2}>
        <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
        <h3>Board</h3>
        <div onClick={()=>setIsModalOpen(true)}><FontAwesomeIcon icon={faUsers} style={{color:"#707070"}}/> Add People</div>
        </div>
        <select id="dateFilter" value={filter} onChange={handleFilterChange}>
          <option value="all">All<img src={down}/></option>
          <option value="today">Today</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>
      <div className={styles.taskBoard}>
       
          <>
            <TaskColumn title="Backlog" tasks={filterTasks('backlog')} />
            <TaskColumn title="To Do" tasks={filterTasks('todo')} />
            <TaskColumn title="In Progress" tasks={filterTasks('in-progress')} />
            <TaskColumn title="Done" tasks={filterTasks('done')} />
          </>
       
      </div>
    </div>
  );
};

export default Board;
