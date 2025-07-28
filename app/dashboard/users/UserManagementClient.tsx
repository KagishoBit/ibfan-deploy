'use client';

import { useState } from 'react';
// Import the User type from your actual types file
import { User } from '@/app/lib/types'; 

// Define the props the component expects, using your User type
// AFTER
interface UserManagementClientProps {
  initialUsers: User[];
  addUserAction: (data: { username: string; email: string; }) => Promise<User>;
  updateUserAction: (id: string, data: { username: string; role: 'admin' | 'user' | null; }) => Promise<User>; // <-- ADD THIS LINE
  deleteUserAction: (userId: string) => Promise<void>;
}

export default function UserManagementClient({
  initialUsers,
  addUserAction,
  deleteUserAction,
}: UserManagementClientProps) {
  
  // Apply the User[] type to the state
  const [users, setUsers] = useState<User[]>(initialUsers);
  
  // State for the new user form, matching your User type properties
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Handler to add a new user
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !email) return;

    try {
      // Pass username and email to the server action
      const newUser = await addUserAction({ username, email });
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setUsername('');
      setEmail('');
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };
  
  // Handler to delete a user
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUserAction(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {/* Use the correct property 'username' from your User type */}
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.username} ({user.email})</span>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}