import React, { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { User } from '../models/User';
import UserForm from './UserForm';
import { UserService } from '../services/UserService';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [deletingUser, setDeletingUser] = useState<User | undefined>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await UserService.getAllUsers();
    setUsers(fetchedUsers);
  };

  const handleCreateUser = () => {
    setEditingUser({} as User);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  const handleConfirmDelete = async () => {
    if (deletingUser) {
      await UserService.deleteUser(deletingUser.id!);
      setDeletingUser(undefined);
      fetchUsers();
    }
  };

  const handleCancelDelete = () => {
    setDeletingUser(undefined);
  };

  const handleSaveUser = async (user: User) => {
    if (editingUser?.id) {
      await UserService.updateUser(editingUser.id, user);
    } else {
      await UserService.createUser(user);
    }
    setEditingUser(undefined);
    fetchUsers();
  };

  return (
    <div>
      <h1>Users</h1>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.id}>
            {user.name} ({user.country}){' '}
            <Button
              variant="warning"
              size="sm"
              onClick={() => handleEditUser(user)}
            >
              Edit
            </Button>{' '}
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteUser(user)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br />
      <Button onClick={handleCreateUser}>Create User</Button>
      {editingUser && (
        <div>
          <hr />
          <h2>{editingUser.id ? 'Edit User' : 'Create User'}</h2>
          <UserForm user={editingUser} onSubmit={handleSaveUser} />
        </div>
      )}
      {deletingUser && (
        <div>
          <hr />
          <h2>Delete User</h2>
          <p>Are you sure you want to delete {deletingUser.name}?</p>
          <Button onClick={handleConfirmDelete}>Yes</Button>{' '}
          <Button onClick={handleCancelDelete}>No</Button>
        </div>
      )}
    </div>
  );
};

export default UserList;
