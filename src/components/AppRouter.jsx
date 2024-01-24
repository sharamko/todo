import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import TodoList from './TodoList';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { collection } from 'firebase/firestore';
import TodoAdd from './TodoAdd';
import TodoEdit from './TodoEdit';

const AppRouter = () => {
  const user = useSelector((state) => state.slice.user);

  return user ? (
    <Routes>
      <Route path="todo/" element={<TodoList />} />
      <Route path="todoadd" element={<TodoAdd />} />
      <Route path="todo/:taskId/" element={<TodoEdit />} />
      <Route path="*" element={<Navigate replace to="todo" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
