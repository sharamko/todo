import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const TodoItem = ({ tasksState }) => {
  const history = useNavigate();
  const handleDelete = async (taskId) => {
    await deleteDoc(doc(db, 'tasks', taskId));
    history('/todo');
  };
  const handleChangeStatus = async (e, id) => {
    const washingtonRef = doc(db, 'tasks', id);
    await updateDoc(washingtonRef, {
      status: e ? false : true,
    });
    history('/todo');
  };
  return (
    <ul className="list-group mt-4 mb-4 w-100">
      {tasksState.map((task) => {
        return (
          <li
            id={task.id}
            key={`${Math.ceil(Date.now() * Math.random())}`}
            className="list-group-item"
          >
            <p>
              {task.date}
              {task.status ? (
                <Badge className="ms-4" bg="primary">
                  Активно
                </Badge>
              ) : (
                <Badge className="ms-4" bg="success">
                  Готово
                </Badge>
              )}
            </p>
            <p className="fs-4"> {task.text}</p>
            <Button
              onClick={() => handleChangeStatus(task.status, task.id)}
              className="m-2"
              variant="success"
            >
              {task.status ? 'Готово' : 'Не готово'}
            </Button>
            <Link className="btn m-2 btn-secondary" to={`/todo/${task.id}`}>
              Редагувати
            </Link>

            <Button
              onClick={() => handleDelete(task.id)}
              className="m-2"
              variant="danger"
            >
              Видалити
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoItem;
