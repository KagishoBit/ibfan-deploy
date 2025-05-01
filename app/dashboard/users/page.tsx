'use client';

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<{
    username: string;
    email: string;
    role: 'admin' | 'user';
  }>({
    username: '',
    email: '',
    role: 'user',
  });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const mockUsers: User[] = [
          { id: 1, username: 'MachusAdmin', email: 'machus@gmail.com', role: 'admin' },
          { id: 2, username: 'Nhlanhla', email: 'wayne@gmail.com', role: 'user' },
          { id: 3, username: 'Simo', email: 'simo@gmail.com', role: 'user' },
          { id: 1, username: 'WayneAdmin', email: 'wayne@yahoo.com', role: 'admin' },
          { id: 2, username: 'Viola', email: 'vio@gmail.com', role: 'user' },
          { id: 3, username: 'Kgola', email: 'kgola@gmail.com', role: 'user' },
        ];
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = () => {
    const newId = users.length + 1;
    const newUserWithId: User = { ...newUser, id: newId };
    setUsers([...users, newUserWithId]);
    setNewUser({ username: '', email: '', role: 'user' });
  };

  const handleEditUser = (user: User) => {
    setNewUser(user);
    setEditingUserId(user.id);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...newUser, id: editingUserId } : user
    );
    setUsers(updatedUsers);
    setNewUser({ username: '', email: '', role: 'user' });
    setEditingUserId(null);
  };

  const handleDeleteUser = (id: number) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Creation/Edit Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editingUserId ? 'Edit User' : 'Create User'}
          </h2>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleInputChange}
              className="border rounded p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              className="border rounded p-2"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="border rounded p-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={editingUserId ? handleUpdateUser : handleCreateUser}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingUserId ? 'Update User' : 'Create User'}
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">User List</h2>
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;