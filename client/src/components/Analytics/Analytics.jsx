import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Analytics.module.css';
import circle from '../../assets/Ellipse 3.png'
const Analytics = () => {
  const { taskCount} = useAuth();

 
  return (
    <div>
      <h2>Analytics</h2>
  
        <div className={styles.analytics}>
          <div className={styles.firstList}>
            <div className={styles.lines}><p><img src={circle}/> Backlog Tasks</p><p>{taskCount.backlogTasks}</p></div>
            <div className={styles.lines}><p><img src={circle}/> To-Do Tasks</p><p>{taskCount.todoTasks}</p></div>
            <div className={styles.lines}><p><img src={circle}/> In-Progress Tasks</p><p>{taskCount.inProgressTasks}</p></div>
            <div className={styles.lines}><p><img src={circle}/> Completed Tasks </p><p>{taskCount.completedTasks}</p></div>
            </div>

          <div className={styles.secondList}>
          <div className={styles.lines}><p><img src={circle}/> High Priority</p><p>{taskCount.highPriority}</p></div>
            <div className={styles.lines}><p><img src={circle}/> Medium Priority </p><p>{taskCount.moderatePriority}</p></div>
            <div className={styles.lines}><p><img src={circle}/> Low Priority </p><p>{taskCount.lowPriority}</p></div>
            <div className={styles.lines}><p><img src={circle}/> Due Dates Tasks</p><p>{taskCount.dueDateTasks}</p></div>
          
          </div>
        </div>
     
    </div>
  );
};

export default Analytics;
