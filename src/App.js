import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [removingTaskId, setRemovingTaskId] = useState(null);
  const inputRef = useRef(null);

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };

  const removeTask = (id) => {
    setRemovingTaskId(id);
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
      setRemovingTaskId(null);
    }, 500); // Match fade-out duration
  };

  // Responsive and dark mode classes
  const appBg = darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100';
  const cardBg = darkMode ? 'bg-secondary text-light' : 'bg-white text-dark';
  const inputBg = darkMode ? 'bg-dark text-light border-0' : '';
  const listGroup = darkMode ? 'list-group list-group-flush' : 'list-group';

  return (
    <div className={`container-fluid ${appBg} py-5 transition-bg`}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className={`card shadow fade-in ${cardBg} transition-bg`}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="card-title mb-0">Todo List</h1>
                <button
                  className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
              </div>
              <form className="d-flex mb-4" onSubmit={addTask}>
                <input
                  ref={inputRef}
                  type="text"
                  className={`form-control me-2 ${inputBg} transition-bg`}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Add a new task"
                />
                <button className="btn btn-primary" type="submit">Add</button>
              </form>
              <ul className={listGroup}>
                {tasks.map(task => (
                  <li
                    className={`list-group-item d-flex justify-content-between align-items-center
                      ${darkMode ? 'bg-dark text-light border-secondary' : ''}
                      ${removingTaskId === task.id ? 'fade-out' : 'slide-in'} transition-bg`}
                    key={task.id}
                  >
                    {task.text}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeTask(task.id)}
                      disabled={removingTaskId === task.id}
                    >
                      Delete
                    </button>
                  </li>
                ))}
                {tasks.length === 0 && (
                  <li className={`list-group-item text-center ${darkMode ? 'bg-dark text-light border-secondary' : ''} slide-in transition-bg`}>
                    No tasks yet!
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
