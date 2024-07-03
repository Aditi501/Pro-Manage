// import React, { useState, useEffect, forwardRef } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import styles from './Create.module.css';
// import trash from '../../assets/Delete.png';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const Edit = ({ isOpen, onClose, taskId }) => {
//   const { updateTask, getTaskById, boardPeople } = useAuth();
//   const [taskData, setTaskData] = useState({
//     title: '',
//     priority: 'Low Priority',
//     assignedTo: '',
//     checklist: [{ text: '', checked: false }],
//     dueDate: null,
//   });
//   const [errors, setErrors] = useState([]);

// //   useEffect(() => {
// //     const fetchTaskData = async () => {
// //             try {
// //                 if (taskId) {
// //                   console.log('Fetching task data for taskId:', taskId);
// //                   const task = await getTaskById(taskId);
// //                   console.log('Fetched task data:', task);
// //                   setTaskData(taskData);
// //                   if (task) {
// //                     setTitle(task.title || '');
// //                     setPriority(task.priority || 'Low Priority');
// //                     setAssignee(task.assignedTo || '');
// //                     setChecklist(task.checklist || [{ text: '', checked: false }]);
// //                     setDueDate(task.dueDate ? new Date(task.dueDate) : '');
// //                   } else {
// //                     console.warn('Task data is undefined');
// //                   }
// //                 }
// //               } catch (error) {
// //                 console.error('Error fetching task data:', error);
// //               } 
// //             };
        

// //     if (isOpen) {
// //       fetchTaskData();
// //     }
// //   }, [isOpen, taskId, getTaskById]);

// useEffect(() => {
//     const fetchTaskData = async () => {
//       if (isOpen && taskId) {
//         try {
//           console.log('Fetching task data for taskId:', taskId);
//           const task = await getTaskById(taskId);
//           console.log('Fetched task data:', task);
//           if (task) {
//             setTaskData({
//               title: task.title || '',
//               priority: task.priority || 'Low Priority',
//               assignedTo: task.assignedTo || '',
//               checklist: task.checklist || [{ text: '', checked: false }],
//               dueDate: task.dueDate ? new Date(task.dueDate) : null,
//             });
//           } else {
//             console.warn('Task data is undefined');
//           }
//         } catch (error) {
//           console.error('Error fetching task data:', error);
//         } 
//       }
//     };
  
//     fetchTaskData();
//   }, [isOpen, taskId, getTaskById]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData({ ...taskData, [name]: value });
//   };

//   const handleChecklistChange = (index, value) => {
//     const newChecklist = [...taskData.checklist];
//     newChecklist[index].text = value;
//     setTaskData({ ...taskData, checklist: newChecklist });
//   };

//   const handleChecklistCheck = (index, checked) => {
//     const newChecklist = [...taskData.checklist];
//     newChecklist[index].checked = checked;
//     setTaskData({ ...taskData, checklist: newChecklist });
//   };

//   const handleAddChecklistItem = () => {
//     setTaskData({ ...taskData, checklist: [...taskData.checklist, { text: '', checked: false }] });
//   };

//   const removeChecklistItem = (index) => {
//     if (taskData.checklist.length > 1) {
//       const newChecklist = taskData.checklist.filter((_, i) => i !== index);
//       setTaskData({ ...taskData, checklist: newChecklist });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = [];
//     if (!taskData.title) newErrors.push('Title is required.');
//     if (!taskData.priority) newErrors.push('Priority is required.');
//     if (taskData.checklist.some(item => !item.text)) newErrors.push('All checklist items are required.');
//     setErrors(newErrors);
//     return newErrors.length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         await updateTask(taskData);
//         onClose();
//       } catch (error) {
//         setErrors([error.message]);
//       }
//     }
//   };

  

//   const CustomInput = forwardRef(({ value, onClick }, ref) => (
//     <button className={styles.dateButton} onClick={onClick} ref={ref}>
//       {value || 'Select Due Date'}
//     </button>
//   ));

//   return (
//     isOpen && (
//       <div className={styles.modalOverlay}>
//         <div className={styles.modalContent}>
//           <form onSubmit={handleSubmit}>
//             <div className={styles.modalBody}>
//               {errors.length > 0 && (
//                 <div className={styles.errors}>
//                   {errors.map((error, index) => (
//                     <p key={index}>{error}</p>
//                   ))}
//                 </div>
//               )}
//               <label className={styles.titleLabel}>
//                 Title <span>*</span>
//                 <input
//                   className={styles.addTitle}
//                   type="text"
//                   name="title"
//                   value={taskData.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </label>
//               <div className={styles.prioritySection}>
//                 <label>Select Priority <span>*</span></label>
//                 <div style={{ display: "flex", gap: "5px" }}>
//                   <button
//                     type="button"
//                     className={taskData.priority === 'High Priority' ? styles.selected : ''}
//                     onClick={() => setTaskData({ ...taskData, priority: 'High Priority' })}
//                   >
//                     🔴 High Priority
//                   </button>
//                   <button
//                     type="button"
//                     className={taskData.priority === 'Medium Priority' ? styles.selected : ''}
//                     onClick={() => setTaskData({ ...taskData, priority: 'Medium Priority' })}
//                   >
//                     🔵 Medium Priority
//                   </button>
//                   <button
//                     type="button"
//                     className={taskData.priority === 'Low Priority' ? styles.selected : ''}
//                     onClick={() => setTaskData({ ...taskData, priority: 'Low Priority' })}
//                   >
//                     🟢 Low Priority
//                   </button>
//                 </div>
//               </div>
//               <label className={styles.assignLabel}>
//                 Assign to:
//                 <select
//                   name="assignedTo"
//                   value={taskData.assignedTo}
//                   onChange={handleInputChange}
//                 >
//                   {boardPeople.map((member, index) => (
//                     <option key={index} value={member}>{member}</option>
//                   ))}
//                 </select>
//               </label>
//               <label className={styles.checklistLabel}>
//                 Checklist {(taskData.checklist) && taskData.checklist.filter(item => item.checked).length}/{taskData.checklist.length} <span>*</span>
//                 {taskData.checklist.map((item, index) => (
//                   <div key={index} className={styles.checklistItem}>
//                     <input
//                       type="checkbox"
//                       checked={item.checked}
//                       onChange={(e) => handleChecklistCheck(index, e.target.checked)}
//                     />
//                     <input
//                       type="text"
//                       value={item.text}
//                       onChange={(e) => handleChecklistChange(index, e.target.value)}
//                       required
//                     />
//                     <img src={trash} alt="Delete" onClick={() => removeChecklistItem(index)} />
//                   </div>
//                 ))}
//                 <button className={styles.addBtn} type="button" onClick={handleAddChecklistItem}>+ Add New</button>
//               </label>
//             </div>
//             <div className={styles.modalFooter}>
//               <DatePicker
//                 selected={taskData.dueDate ? new Date(taskData.dueDate) : null}
//                 onChange={date => setTaskData({ ...taskData, dueDate: date })}
//                 customInput={<CustomInput />}
//                 dateFormat="MM/dd/yyyy"
//                 showPopperArrow={false}
//               />
//               <button type="button" onClick={onClose} style={{ background: "transparent", border: "1px solid #CF3636", color: "#CF3636" }}>Cancel</button>
//               <button type="submit" style={{ background: "#17A2B8", border: "none", color: "white" }}>Save</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };

// export default Edit;

import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Create.module.css';
import trash from '../../assets/Delete.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Edit = ({ isOpen, onClose, taskId }) => {
  const { updateTask, getTaskById, boardPeople } = useAuth();
  const [taskData, setTaskData] = useState({
    title: '',
    priority: 'Low Priority',
    assignedTo: '',
    checklist: [{ text: '', checked: false }],
    dueDate: null,
  });
  const [errors, setErrors] = useState([]);
  const initialFetch = useRef(true);

  useEffect(() => {
    const fetchTaskData = async () => {
      if (isOpen && taskId && initialFetch.current) {
        try {
          console.log('Fetching task data for taskId:', taskId);
          const task = await getTaskById(taskId);
          console.log('Fetched task data:', task);
          if (task) {
            setTaskData({
              title: task.title || '',
              priority: task.priority || 'Low Priority',
              assignedTo: task.assignedTo || '',
              checklist: task.checklist || [{ text: '', checked: false }],
              dueDate: task.dueDate ? new Date(task.dueDate) : null,
            });
          } else {
            console.warn('Task data is undefined');
          }
        } catch (error) {
          console.error('Error fetching task data:', error);
        }
        initialFetch.current = false;
      }
    };

    fetchTaskData();
  }, [isOpen, taskId, getTaskById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...taskData.checklist];
    newChecklist[index].text = value;
    setTaskData({ ...taskData, checklist: newChecklist });
  };

  const handleChecklistCheck = (index, checked) => {
    const newChecklist = [...taskData.checklist];
    newChecklist[index].checked = checked;
    setTaskData({ ...taskData, checklist: newChecklist });
  };

  const handleAddChecklistItem = () => {
    setTaskData({ ...taskData, checklist: [...taskData.checklist, { text: '', checked: false }] });
  };

  const removeChecklistItem = (index) => {
    if (taskData.checklist.length > 1) {
      const newChecklist = taskData.checklist.filter((_, i) => i !== index);
      setTaskData({ ...taskData, checklist: newChecklist });
    }
  };

  const validateForm = () => {
    const newErrors = [];
    if (!taskData.title) newErrors.push('Title is required.');
    if (!taskData.priority) newErrors.push('Priority is required.');
    if (taskData.checklist.some(item => !item.text)) newErrors.push('All checklist items are required.');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await updateTask(taskData,taskId);
        onClose();
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className={styles.dateButton}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
      ref={ref}
    >
      {value || 'Select Due Date'}
    </button>
  ));

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.modalBody}>
              {errors.length > 0 && (
                <div className={styles.errors}>
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <label className={styles.titleLabel}>
                Title <span>*</span>
                <input
                  className={styles.addTitle}
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className={styles.prioritySection}>
                <label>Select Priority <span>*</span></label>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    type="button"
                    className={taskData.priority === 'High Priority' ? styles.selected : ''}
                    onClick={() => setTaskData({ ...taskData, priority: 'High Priority' })}
                  >
                    🔴 High Priority
                  </button>
                  <button
                    type="button"
                    className={taskData.priority === 'Medium Priority' ? styles.selected : ''}
                    onClick={() => setTaskData({ ...taskData, priority: 'Medium Priority' })}
                  >
                    🔵 Medium Priority
                  </button>
                  <button
                    type="button"
                    className={taskData.priority === 'Low Priority' ? styles.selected : ''}
                    onClick={() => setTaskData({ ...taskData, priority: 'Low Priority' })}
                  >
                    🟢 Low Priority
                  </button>
                </div>
              </div>
              <label className={styles.assignLabel}>
                Assign to:
                <select
                  name="assignedTo"
                  value={taskData.assignedTo}
                  onChange={handleInputChange}
                >
                   <option>select assignee</option>
                  {boardPeople && boardPeople.map((member, index) => (
                    <option key={index} value={member}>{member}</option>
                  ))}
                </select>
              </label>
              <label className={styles.checklistLabel}>
                Checklist {(taskData.checklist && taskData.checklist.length > 0) ? `${taskData.checklist.filter(item => item.checked).length}/${taskData.checklist.length}` : ''}
                {taskData.checklist.map((item, index) => (
                  <div key={index} className={styles.checklistItem}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => handleChecklistCheck(index, e.target.checked)}
                    />
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => handleChecklistChange(index, e.target.value)}
                      required
                    />
                    <img src={trash} alt="Delete" onClick={() => removeChecklistItem(index)} />
                  </div>
                ))}
                <button className={styles.addBtn} type="button" onClick={handleAddChecklistItem}>+ Add New</button>
              </label>
            </div>
            <div className={styles.modalFooter}>
              <DatePicker
                selected={taskData.dueDate ? new Date(taskData.dueDate) : null}
                onChange={date => setTaskData({ ...taskData, dueDate: date })}
                customInput={<CustomInput />}
                dateFormat="MM/dd/yyyy"
                showPopperArrow={false}
              />
              <button type="button" onClick={onClose} style={{ background: "transparent", border: "1px solid #CF3636", color: "#CF3636" }}>Cancel</button>
              <button type="submit" style={{ background: "#17A2B8", border: "none", color: "white" }}>Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Edit;
