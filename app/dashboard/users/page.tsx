import { getUsers, addUser, updateUser, deleteUser } from '@/app/lib/actions';
import UserManagementClient from './UserManagementClient';

// This is now a Server Component
export default async function UserManagementPage() {
  // Fetch initial data on the server
  const users = await getUsers();

  return (
    <UserManagementClient
      initialUsers={users}
      addUserAction={addUser}
      updateUserAction={updateUser}
      deleteUserAction={deleteUser}
    />
  );
}