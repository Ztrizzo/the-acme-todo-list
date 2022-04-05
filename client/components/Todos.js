
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createTodoSingleUser } from '../store';

class Todos extends React.Component {

  constructor(){
    super();
    this.state = {
      taskName: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render(){ 
    let {match, todos, users} = this.props;
    let singleUser = false;
    let userId;



    //filter todos based on what user we have selected in the url
    //if id is 0, task is considered unassigned
    if(match.path === '/users/:id'){
      singleUser = true;
      if(match.params.id === '0'){
        todos = todos.filter(todo => todo.userId === null)
        userId = null;
      }
      else{
        todos = todos.filter(todo => todo.userId === match.params.id * 1);
        userId = match.params.id * 1
      }
    }



    return(<ul>
      {todos.map((todo) => {
        const user = users.find( user => user.id === todo.userId);
        return (
            <li key={todo.id}>
              <h2>
                <Link to={`/todos/${todo.id}`}>Task: {todo.taskName}</Link>
              </h2>
              <p>assigned to <Link to={`/users/${user ? user.id : 0}`}>{ user ? user.name : 'unassigned'}</Link></p>
            </li>
          );
        })}
        {/*input field for if we have single user selected */}
        {singleUser ? 
        <div id='singleUserAdd'>
          <input name='taskName' value={this.state.taskName} onChange={this.handleChange}/>
          <button onClick={() => this.props.submit({taskName: this.state.taskName, userId: userId}, this.props.history)}>+</button>
        </div> : 
        null}
      </ul>
    );
  }
 
};

const mapStateToProps = ({ todos, users }) => ({
  todos,
  users
});

const mapDispatchToProps = (dispatch) => {
  return {
    submit: function(todo, history){
      dispatch(createTodoSingleUser(todo, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
