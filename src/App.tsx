import { useState } from 'react';
import { TodoList } from './components/TodoList';
import getUserById from './utils/getUserById';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todos';

export const App = () => {
  const [userId, setUserId] = useState('');

  const todosWithUsers: Todo[] = [];

  for (const todo of todosFromServer) {
    const user = usersFromServer.find(u => u.id === todo.userId);

    if (user) {
      todosWithUsers.push({
        ...todo,
        user,
      });
    }
  }

  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValidTitle = title.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    if (!(title.trim() !== '' && userId !== '')) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newId = maxId + 1;

    const selectedUserId = Number(userId);
    const user = getUserById(selectedUserId);

    if (!user) {
      return;
    }

    const newTodo = {
      id: newId,
      title,
      userId: selectedUserId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId('');
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
            onChange={event => {
              setTitle(event.target.value);
              setSubmitted(false);
            }}
          />

          {submitted && !isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setSubmitted(false);
            }}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {submitted && userId === '' && (
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
