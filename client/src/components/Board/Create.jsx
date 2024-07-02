import React, { useState, useEffect, forwardRef} from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Create.module.css';
import trash from '../../assets/Delete.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getEmailIconText } from '../../utils/EmailIcon';


const Create = ({ isOpen, onClose }) => {
  const { createTask, boardPeople } = useAuth();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low Priority');
  const [assignee, setAssignee] = useState('');
  const [checklist, setChecklist] = useState([
    { text: '', checked: false },
  ]);
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState([]);
  const [showDateInput, setShowDateInput] = useState(false);

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { text: '', checked: false }]);
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = value;
    setChecklist(newChecklist);
  };

  const handleChecklistCheck = (index, checked) => {
    const newChecklist = [...checklist];
    newChecklist[index].checked = checked;
    setChecklist(newChecklist);
  };

  const removeChecklistItem = (index) => {
    if (checklist.length > 1) {
      const newChecklist = checklist.filter((_, i) => i !== index);
      setChecklist(newChecklist);
    }
  };

  const validateForm = () => {
    const newErrors = [];
    if (!title) newErrors.push('Title is required.');
    if (!priority) newErrors.push('Priority is required.');
    if (checklist.some(item => !item.text)) newErrors.push('All checklist items are required.');
    if (checklist.length < 1) newErrors.push('There must be at least three checklist items.');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTask = {
        title,
        priority,
        assignedTo: assignee,
        checklist,
        dueDate,
      };
      try {
        console.log("Submitting Task:", newTask);
        await createTask(newTask);
        onClose();
      } catch (error) {
        setErrors([error.message]);
      }
    }
  };

  const getCheckedCount = () => {
    return checklist.filter(item => item.checked).length;
  };

  useEffect(() => {
    if (isOpen) {
      setChecklist([
        { text: '', checked: false }
      ]);
      setTitle('');
      setPriority('Low Priority');
      setAssignee('');
      setDueDate('');
      setErrors([]);
    
    }
  }, [isOpen]);
 
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={styles.dateButton}   
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
     ref={ref}>
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
                <input className={styles.addTitle} type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </label>
              <div className={styles.prioritySection}>
                <label>Select Priority  <span>*</span></label>
                <div style={{display:"flex",gap:"5px"}}>
                  <button type="button" className={priority === 'High Priority' ? styles.selected : ''} onClick={() => setPriority('High Priority')}>🔴 High Priority </button>
                  <button type="button" className={priority === 'Medium Priority' ? styles.selected : ''} onClick={() => setPriority('Medium Priority')}>🔵 Medium Priority </button>
                  <button type="button" className={priority === 'Low Priority' ? styles.selected : ''} onClick={() => setPriority('Low Priority')}>🟢 Low Priority </button>
                </div>
              </div>
              <label className={styles.assignLabel}>
                Assign to:
                <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                  {boardPeople.map((member, index) => (
                    <option key={index} value={member}
                    style={{
                      backgroundImage: `url(${getEmailIconText(member)})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'left center',
                      paddingLeft: '30px',
                    }}
                    >
                       {/* <span className={styles.tooltipIcon}> {getEmailIconText(member)} | </span> */}
                      {member}</option>
                  ))}
                </select>
              </label>
              <label className={styles.checklistLabel}>
                Checklist {getCheckedCount()}/{checklist.length} <span>*</span>
                {checklist.map((item, index) => (
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
                    <img src ={trash} onClick={() => removeChecklistItem(index)} disabled={checklist.length <= 1}/>
                 
                  </div>
                ))}
                <button className={styles.addBtn} type="button" onClick={handleAddChecklistItem}>+ Add New</button>
              </label>
              <div>
              </div>
            </div>
            <div className={styles.modalFooter}>
            <DatePicker
                    selected={dueDate}
                    onChange={date => setDueDate(date)}
                    customInput={<CustomInput />}
                    dateFormat="MM/dd/yyyy"
                    showPopperArrow={false}
                   
                  />
              <button type="button" onClick={onClose} style={{background:"transparent",border:"1px solid #CF3636",color:"#CF3636"}}>Cancel</button>
              <button type="submit" style={{background:"#17A2B8",border:"none",color:"white"}}>Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Create;
