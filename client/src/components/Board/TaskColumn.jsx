import React, { useState, useEffect } from 'react';
import styles from './Board.module.css';
import { useAuth } from '../../context/AuthContext';
import circle1 from '../../assets/Ellipse 2.png';
import circle2 from '../../assets/Ellipse 2 (1).png';
import circle3 from '../../assets/Ellipse 2 (2).png';
import Dropdown from './Dropdown';
import { format, isPast } from 'date-fns';
import Create from './Create';

const TaskColumn = ({ tasks, title }) => {
  const { updateTaskStatus } = useAuth();
  const [checkedItems, setCheckedItems] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [columnCollapsed, setColumnCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const initialCheckedItems = {};
    const initialCollapsedState = {};
    tasks.forEach(task => {
      initialCheckedItems[task._id] = task.checklist ? task.checklist.map(item => ({
        text: item.text,
        checked: item.checked
      })) : [];
      initialCollapsedState[task._id] = false;
    });
    setCheckedItems(initialCheckedItems);
    setCollapsed(initialCollapsedState);

   
  }, [tasks]);

  const handleCheckboxChange = (taskId, index) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [taskId]: prevState[taskId].map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const getCheckedCount = (taskId) => {
    return checkedItems[taskId] ? checkedItems[taskId].filter(item => item.checked).length : 0;
  };

  const toggleCollapse = (taskId) => {
    setCollapsed(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const toggleColumnCollapse = () => {
    setColumnCollapsed(prevState => !prevState);
    const newCollapsedState = {};
    tasks.forEach(task => {
      newCollapsedState[task._id] = !columnCollapsed;
    });
    setCollapsed(newCollapsedState);
  };
  return (
    <>
      <div key={title} className={styles.taskColumn}>
        <div className={styles.taskTitleHeader}><h3>{title}</h3>
        <div style={{display:"flex"}}>
        {title === 'To Do' && <button style={{fontSize:"25px"}} onClick={handleOpenModal}>+</button>}
        <button style={{float:"right"}} onClick={toggleColumnCollapse}>
          {tasks && columnCollapsed ? '▼' : '▼'}
        </button>
        </div>
        </div>
        <Create isOpen={isModalOpen} onClose={handleCloseModal} />
        <div key={title} className={styles.column}>
          {tasks.map(task => (
            <div key={task._id} className={styles.taskCard}>
              <div className={styles.taskHeader}>
                <h4>{task.title}</h4>
                <Dropdown taskId={task._id} />
              </div>
              <div className={styles.priority}>
                {task.priority === 'Low Priority' ? (
                  <img className={styles.priorityImg} src={circle1} alt="Low Priority" />
                ) : task.priority === 'High Priority' ? (
                  <img className={styles.priorityImg} src={circle2} alt="High Priority" />
                ) : (
                  task.priority === 'Medium Priority' && (
                    <img className={styles.priorityImg} src={circle3} alt="Medium Priority" />
                  )
                )}
                <p>{task.priority}</p>
              </div>

              <div className={styles.checklistContainer}>
                <p onClick={() => toggleCollapse(task._id)} className={styles.checklistHeader}>
                  Checklist ({getCheckedCount(task._id)}/{task.checklist.length})
                  <button className={styles.collapseButton}>
                    {collapsed[task._id] ? '▼' : '▼'}
                  </button>
                </p>
                { task.checklist &&!collapsed[task._id] && (
                  <div className={styles.checklistItem}>
                   {task.checklist.map((item,index)=> (
                    <label key={item._id}>
                        <input type="checkbox"
                        checked={checkedItems[task._id] && checkedItems[task._id][index] ? checkedItems[task._id][index].checked : false}
                        onChange={()=>handleCheckboxChange(task._id, index)} />
                        {item.text}
                    </label>
                ))}
                  </div>
                )}
              </div>
              <div className={styles.statusButtons}>
                {task.status === 'backlog' && (
                  <div className={styles.buttonBox}>
                    {task.dueDate && (
                      <button
                        className={styles.shareDueDate}
                        style={{
                          backgroundColor: isPast(new Date(task.dueDate)) ? '#CF3636' : '#DBDBDB',
                          color: isPast(new Date(task.dueDate)) ? 'white' : '#5A5A5A'
                        }}
                      >
                        {formatDate(task.dueDate)}
                      </button>
                    )}
                    <button onClick={() => handleStatusChange(task._id, 'in-progress')}>Progress</button>
                    <button onClick={() => handleStatusChange(task._id, 'todo')}>Todo</button>
                    <button onClick={() => handleStatusChange(task._id, 'done')}>Done</button>
                  </div>
                )}
                {task.status === 'todo' && (
                  <div className={styles.buttonBox}>
                    {task.dueDate && (
                      <button
                        className={styles.shareDueDate}
                        style={{
                          backgroundColor: isPast(new Date(task.dueDate)) ? '#CF3636' : '#DBDBDB',
                          color: isPast(new Date(task.dueDate)) ? 'white' : '#5A5A5A'
                        }}
                      >
                        {formatDate(task.dueDate)}
                      </button>
                    )}
                    <button onClick={() => handleStatusChange(task._id, 'in-progress')}>Progress</button>
                    <button onClick={() => handleStatusChange(task._id, 'backlog')}>Backlog</button>
                    <button onClick={() => handleStatusChange(task._id, 'done')}>Done</button>
                  </div>
                )}
                {task.status === 'in-progress' && (
                  <div className={styles.buttonBox}>
                    {task.dueDate && (
                      <button
                        className={styles.shareDueDate}
                        style={{
                          backgroundColor: isPast(new Date(task.dueDate)) ? '#CF3636' : '#DBDBDB',
                          color: isPast(new Date(task.dueDate)) ? 'white' : '#5A5A5A'
                        }}
                      >
                        {formatDate(task.dueDate)}
                      </button>
                    )}
                    <button onClick={() => handleStatusChange(task._id, 'todo')}>Todo</button>
                    <button onClick={() => handleStatusChange(task._id, 'backlog')}>Backlog</button>
                    <button onClick={() => handleStatusChange(task._id, 'done')}>Done</button>
                  </div>
                )}
                {task.status === 'done' && (
                  <div className={styles.buttonBox}>
                    {task.dueDate && (
                      <button
                        className={styles.shareDueDate}
                        style={{
                          backgroundColor:'#63C05B',
                          color: 'white' 
                        }}
                      >
                        {formatDate(task.dueDate)}
                      </button>
                    )}
                    <button onClick={() => handleStatusChange(task._id, 'backlog')}>Backlog</button>
                    <button onClick={() => handleStatusChange(task._id, 'in-progress')}>In Progress</button>
                    <button onClick={() => handleStatusChange(task._id, 'todo')}>To do</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskColumn;
