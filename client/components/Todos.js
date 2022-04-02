import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Todos = ({ todos, users }) => {
  return (
    <ul>
      {todos.map((todo) => {
        const user = users.find( user => user.id === todo.userId);
        return (
          <li key={todo.id}>
            <h2>
              <Link to={`/todos/${todo.id}`}>Task: {todo.taskName}</Link>
            </h2>
            <p>assigned to { user ? user.name : 'unassigned'}</p>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = ({ todos, users }) => ({
  todos,
  users
});

export default connect(mapStateToProps)(Todos);
