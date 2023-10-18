import logo from './assets/logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import ProviderRequest from './providers/request'
import { ENDPOINTS } from './constants'
import User from './types/User'

function App() {

  const [users, setUsers] = useState<User[]>();
  const [error, setError] = useState<string>('');

const fetchUsers = async () => {
  try {
    const users = await ProviderRequest.get(ENDPOINTS.USERS);
    setUsers(users);
  } catch(error) {
    console.error(`Error trying to fetch users: ${error}`);
    setError(String(error));
  }
}
  
  useEffect(() => {
      fetchUsers();
  }, []);
  
  return (
    <>
      <div>
          <img src={logo} className="logo react" alt="Aidence logo" />
         {error? <p>{error}</p> : null}
      </div>
   
    </>
  )
}

export default App
