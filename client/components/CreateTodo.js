import React, { Component } from 'react';
import { createTodo } from '../store/todos';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CreateTodo extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      userId: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createTodo({ ...this.state });
  }

  render() {
    const { userId, taskName } = this.state;
    const { users } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <form id='todo-form' onSubmit={handleSubmit}>
        <label htmlFor='taskName'>Task Name:</label>
        <input name='taskName' onChange={handleChange} value={taskName} />
        <select name='userId' onChange={handleChange} value={userId}>
          <option value=''>-- nobody --</option>
          {
            users.map( user => {
              return (
                <option value={ user.id } key={ user.id }>
                  { user.name }
                </option>
              );
            })
          }
        </select>

        <button type='submit'>Submit</button>
        <Link to='/'>Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createTodo: (todo) => dispatch(createTodo(todo, history))
});

export default connect(state=> state, mapDispatchToProps)(CreateTodo);
