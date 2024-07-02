import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'
const AuthContext = createContext();
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [taskId, setTaskId] = useState('');
  const [name, setName] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [taskCount, setTaskCounts] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [userData, setUserData] = useState(null);
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState('backlog');
  const [boardPeople,setBoardPeople]=useState([]);
  const [loading, setLoading] = useState(true);
  const [memberEmail,setMemberEmail]=useState('')
  const navigate=useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');
    const emailId = localStorage.getItem('email');
    if (token && id && storedName) {
      setAuthToken(token);
      setUserId(id);
      setName(storedName);
      setEmail(emailId);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !authToken) {
      navigate('/login');
    }
  }, [authToken, loading]);



  useEffect(() => {
    if (authToken && userId) {
      console.log("Fetching tasks with token:", authToken);
      const fetchTasks = async () => {
        try {
          await filteredTasks(filter, userId);
        } catch (error) {
          console.log("Error fetching tasks:", error);
        }
      };
      fetchTasks();
    }
  }, [userId, authToken, filter]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (userId) {
          await fetchTaskCounts(userId);
        }
      }
      catch (error) {
        console.log(error)
      }

    }
    fetchTask();
  }, [userId, authToken]);

useEffect(()=>{
  const fetchMembers = async () => {
    try {
      if(authToken){
        await getPeople();
      }
    }
    catch (error) {
      console.log(error)
    }

  }
  fetchMembers();
},[authToken])

  console.log(authToken)
  console.log(boardPeople)

  const registerUser = async ({ name, email, password, confirmPassword }) => {
    try {
      const response = await axios.post(`https://pro-manage-9qcp.onrender.com/api/v1/auth/register`, {
        name,
        email,
        password,
        confirmPassword
      });

      console.log(response.data);
    }
    catch (error) {
      console.log(error)
    }
  }

  const loginUser = async ({ email, password }) => {
    try {
      const reqUrl = `https://pro-manage-9qcp.onrender.com/api/v1/auth/login`;
      const response = await axios.post(reqUrl, { email, password });

      localStorage.setItem('token', response.data.token);
      const decodedToken = jwtDecode(response.data.token);
      const userId = decodedToken.userId;
      const username = decodedToken.name;

      setAuthToken(response.data.token);
      setUserId(userId);
      setName(username);
      setEmail(email);

      localStorage.setItem('userId', userId);
      localStorage.setItem('name', username);
      localStorage.setItem('email', email);

      return { token: response.data.token, userId, username };
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put(`https://pro-manage-9qcp.onrender.com/api/v1/task/status/${taskId}`, { status: newStatus }, {
        headers: { Authorization: authToken }
      });
      console.log('Task status updated:', response.data);
      setTaskId(taskId);
      setStatus(newStatus);
      await filteredTasks(filter, userId);
      await fetchTaskCounts(email);
      return response.data.task;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  };
  const filteredTasks = async (filter, email) => {
    console.log("Filtered Tasks Function Called with:", filter, email);
    try {
      const response = await axios.get('https://pro-manage-9qcp.onrender.com/api/v1/task/filter',
        { headers: { Authorization: authToken }, params: { filter } }, { email }
      )
      console.log('Filtered tasks response:', response.data);
      setFiltered(response.data)
      setFilter(filter);
    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchTaskCounts = async (email) => {
    try {
      const response = await axios.get('https://pro-manage-9qcp.onrender.com/api/v1/task/total',
        { headers: { Authorization: authToken } }, { email }
      );
      setTaskCounts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching task counts:', error);
    }
  };
  const updateUser = async (updatedData) => {
    const payload = {};
    if (updatedData.name) payload.name = updatedData.name;
    if (updatedData.email) payload.email = updatedData.email;
    if (updatedData.oldPassword) payload.oldPassword = updatedData.oldPassword;
    if (updatedData.newPassword) payload.newPassword = updatedData.newPassword;
    console.log("Payload to be sent:", payload);

    try {
      const response = await axios.patch('https://pro-manage-9qcp.onrender.com/api/v1/auth/update', payload,
        { headers: { Authorization: authToken } }
      )
      setUserData(response.data.user);
      if (name) localStorage.setItem('name', name);
      if (email) localStorage.setItem('email', email);
      setName(name);
      setEmail(email);
      console.log(response.data.user);
      return response.data.user;
    }
    catch (error) {
      console.log(error);
    }
  }
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`https://pro-manage-9qcp.onrender.com/api/v1/task/delete/${taskId}`,
        { headers: { Authorization: authToken } }
      )
      setFiltered((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      return response.data;
    }
    catch (error) {
      console.log(error)
    }
  }
  const shareTask = async (taskId) => {
    try {
      const response = await axios.get(`https://pro-manage-9qcp.onrender.com/api/v1/task/get/${taskId}`)
      setTaskId(taskId);
      console.log(response.data);

      await filteredTasks(filter, email);

      return response.data;

    }
    catch (error) {
      console.log(error);
    }
  }

  const getTaskById = async (taskId) => {
    try {
      const response = await axios.get(`https://pro-manage-9qcp.onrender.com/api/v1/task/get/${taskId}`)
      setTaskId(taskId);
      console.log(response.data);


      await filteredTasks(filter, email);

      return response.data;

    }
    catch (error) {
      console.log(error);
    }
  }

  const createTask = async (data) => {
    try {

      const formattedChecklist = data.checklist.map(item => {
        if (!item.text) {
          throw new Error('Checklist item must have a text field');
        }
        return {
          text: item.text,
          checked: item.checked || false
        };
      });
      const response = await axios.post(`https://pro-manage-9qcp.onrender.com/api/v1/task/create`, 
        { ...data, checklist: formattedChecklist },
        { headers: { Authorization: authToken } }
      );
      setFiltered((prev) => [...prev, response.data]); 
      console.log('Task created successfully:', response.data);
      await getPeople();
      await filteredTasks(filter, email);
    } catch (error) {
      console.log('Error creating task:', error.response.data);
    }
  }
  

  const addPeople=async(email)=>{
    try{
      const response= await axios.post('https://pro-manage-9qcp.onrender.com/api/v1/auth/addMember',{email},
        { headers: { Authorization: authToken } }
      )
      console.log(response.data);
      return response.data;
    }
    catch(error){
      console.log(error)
    }
  }
  const getPeople=async()=>{
    try{
      const response= await axios.get('https://pro-manage-9qcp.onrender.com/api/v1/auth/getMember',
        { headers: { Authorization: authToken } }
      )
      const members = response.data.people[0]?.members;
      setBoardPeople(members);
      console.log(response.data);
      return response.data;
    }
    catch(error){
      console.log(error)
    }
  }
  const updateTask = async (data,taskId) => {
    try {

      const formattedChecklist = data.checklist.map(item => {
        if (!item.text) {
          throw new Error('Checklist item must have a text field');
        }
        return {
          text: item.text,
          checked: item.checked || false
        };
      });
      const response = await axios.put(`https://pro-manage-9qcp.onrender.com/api/v1/task/update/${taskId}`, 
        { ...data, checklist: formattedChecklist },
        { headers: { Authorization: authToken } }
      );
      setFiltered((prev) => prev.map(task => task._id === taskId ? response.data : task));
      console.log('Task updated successfully:', response.data);
      await filteredTasks(filter, email);
    } catch (error) {
      console.log('Error creating task:', error.response.data);
    }
  }
  

  return (
    <AuthContext.Provider value={{
      registerUser,
      loginUser,
      taskCount,
      setTaskCounts,
      fetchTaskCounts,
      name,
      filtered,
      filteredTasks,
      setFiltered,
      filter,
      setFilter,
      authToken,
      updateTaskStatus,
      setUserData,
      userData,
      updateUser,
      deleteTask,
      shareTask,
      taskId,
      createTask,
      addPeople,
      getPeople,
      boardPeople,
      updateTask,
      getTaskById
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);