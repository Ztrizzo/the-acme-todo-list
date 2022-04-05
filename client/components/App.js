import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Todos from './Todos';
import CreateTodo from './CreateTodo';
import EditTodo from './EditTodo';
import { connect } from 'react-redux';
import { fetchTodos, fetchUsers } from '../store';
import Error from './Error';

class App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Router>
        <div id='main'>
          <h1>
            <Link to='/'>Todos ({this.props.todos.length})</Link>
          </h1>
          <Link to='/todos/create'>Create A New Todo</Link>
          <Route path='/' component={Error}/>
          <Switch>
            <Route path='/users/:id' component={Todos} />
            <Route exact path='/' component={Todos} />
            <Route path='/todos/create' component={CreateTodo} />
            <Route path='/todos/:id' component={EditTodo} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos
});

const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(fetchTodos())
    dispatch(fetchUsers())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
