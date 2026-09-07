import { useState } from 'react';
import { TodoList } from './components/TodoList';
import getUserById from './utils/getUserById';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValidTitle = title.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    if (!(title.trim() !== '' && userId !== 0)) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(0);
    setSubmitted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {submitted && !isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {submitted && userId === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
