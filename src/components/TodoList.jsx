import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TodoItem from './TodoItem';
import { collection, doc, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { setTasks } from '../store/slice';
import MyCalendar from './MyCalendar';

const TodoList = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.slice.userInfo);
  const tasksState = useSelector((state) => state.slice.tasks);
  const tasksCollection = collection(db, 'tasks');
  const filteredQuery = query(
    tasksCollection,
    where('userId', '==', userInfo ? userInfo.userId : null)
  );
  const [tasks] = useCollectionData(filteredQuery, { idField: 'id' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const formattedDate = `${selectedDate.getDate()}.${
    selectedDate.getMonth() + 1
  }.${selectedDate.getFullYear()}`;

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [tasks]);

  const handleInput = (value) => {
    setInputValue(value);
  };

  const handleSubmit = async () => {
    const task = {
      date: formattedDate,
      text: inputValue,
      status: true,
      id: `${userInfo.userId}_${Date.now()}`,
    };
    await setDoc(doc(db, 'tasks', task.id), task);
  };
  return (
    <Container className="d-flex flex-column align-items-center">
      {userInfo && (
        <h1 className="mt-4 mb-4 text-center">Задачі {userInfo.name}</h1>
      )}
      <Link className="btn btn-primary mb-4" to={'/todoadd'}>
        Створити задачу
      </Link>
      {tasksState && tasksState.length > 0 ? (
        <>
          <MyCalendar events={tasksState} />
          <TodoItem tasksState={tasksState} />
        </>
      ) : (
        <p className="fs-4 m-4 text-center">Задач немає...</p>
      )}
    </Container>
  );
};

export default TodoList;
