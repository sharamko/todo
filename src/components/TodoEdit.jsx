import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import CustomCalendar from './CustomCalendar';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';

const TodoEdit = () => {
  const history = useNavigate();
  const { taskId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const formattedDate = `${selectedDate.getDate()}.${
    selectedDate.getMonth() + 1
  }.${selectedDate.getFullYear()}`;

  const [value] = useDocument(doc(db, 'tasks', taskId));

  useEffect(() => {
    if (value) {
      setInputValue(value.data().text);
    }
  }, [value]);

  const handleInput = (value) => {
    setInputValue(value);
  };
  const handleSubmit = async () => {
    const washingtonRef = doc(db, 'tasks', taskId);
    await updateDoc(washingtonRef, {
      text: inputValue,
      date: formattedDate,
    });

    history('/todo');
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
            Зберегти
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

export default TodoEdit;
