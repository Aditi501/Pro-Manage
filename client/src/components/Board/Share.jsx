import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './share.module.css';
import circle1 from '../../assets/Ellipse 2.png';
import circle2 from '../../assets/Ellipse 2 (1).png';
import circle3 from '../../assets/Ellipse 2 (2).png';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/codesandbox.png';

const Share = () => {
  const { shareTask} = useAuth();
  const taskId=localStorage.getItem('currTaskId')
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const naviagte=useNavigate()

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskData = await shareTask(taskId);
        setTask(taskData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError('Error fetching task details');
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const formattedDueDate = task.dueDate ? format(new Date(task.dueDate), 'dd MMMM') : ' ';
  return (
    <>
     <h4 className={styles.logo} onClick={()=>naviagte('/')}><img src={logo}/><span>Pro Manage</span></h4>
    <div className={styles.taskDetails}>
      <div className={styles.priority}>
              {task.priority === 'Low Priority' ? <img className= {styles.priorityImg} src={circle1} alt="Low Priority" /> : task.priority === 'High Priority' ? <img className= {styles.priorityImg} src={circle2} alt="High Priority" /> : task.priority === 'Medium Priority' && <img className= {styles.priorityImg} src={circle3} alt="Medium Priority" />}
              <p>{task.priority}</p>
            </div>
      <h2>{task.title}</h2>
      <div className={styles.checkList}>
      {(task.checklist)&&task.checklist.map((item)=> (
                    <label key={item._id}>
                        <input type="checkbox"
                        checked={item.checked}
                       readOnly />
                        {item.text}
                    </label>
                ))}
      </div>
    <div className={styles.date}>
      {(task.dueDate)&& (<><h5>Due Date</h5><button className={styles.shareDueDate}>{formattedDueDate}</button></>)}
    </div>
    </div>
    </>
  );
};

export default Share;
