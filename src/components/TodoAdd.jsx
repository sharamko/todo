import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import CustomCalendar from './CustomCalendar';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TodoAdd = () => {
  const history = useNavigate();
  const userInfo = useSelector((state) => state.slice.userInfo);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const formattedDate = `${selectedDate.getDate()}.${
    selectedDate.getMonth() + 1
  }.${selectedDate.getFullYear()}`;

  const handleInput = (value) => {
    setInputValue(value);
  };
  const handleSubmit = async () => {
    const task = {
      date: formattedDate,
      text: inputValue,
      status: true,
      userId: userInfo.userId,
      id: `${userInfo.userId}_${Date.now()}`,
    };
    if (inputValue.length > 0) {
      await setDoc(doc(db, 'tasks', task.id), task);
      history('/todo');
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1 className="mt-4 mb-4 text-center">Додати задачу</h1>

      <div className="mt-4 w-100">
        <Form.Label htmlFor="inputText">Що треба зробити?</Form.Label>
        <div className="d-flex">
          <Form.Control
            onInput={(e) => handleInput(e.target.value)}
            value={inputValue}
            type="text"
            id="inputText"
          />
          <Button onClick={handleSubmit} className="ms-2" variant="primary">
            Додати
          </Button>
        </div>
      </div>
      <div className=" w-100">
        <p className="mt-3">На яку дату?</p>
        <CustomCalendar onDateChange={setSelectedDate} />
      </div>
    </Container>
  );
};

export default TodoAdd;
