import React from 'react'
import axios from 'axios'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todoList: [],
    todoName: "",
    displayed: true,
    error: "",
  };
  nameChange = (e) => {
    const { value } = e.target;
    this.setState({ ...this.state, todoList: value });
  };
  newTodo = () => {
    axios
      .post(URL, { name: this.state.todoName })
      .then((res) => {
        this.setState({
          ...this.state,
          todoList: this.state.todoList.concat(res.data.data),
        });
        this.resetForm();
      })
      .catch(this.setError);
  };
  setError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message });
  };
  resetForm = () => {
    this.setState({
      ...this.state,
      todoNameInput: "",
    });
  };
  formSubmit = (e) => {
    e.preventDefault();
    this.newTodo();
  };
  getAll = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({
          ...this.state,
          todoList: res.data.data,
        });
      })
      .catch(this.setError);
  };

  toggleCompleted = (id) => (e) => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todoList: this.state.todoList.map((item) => {
            if (item.id !== id) {
              return item;
            } else {
              return res.data.data;
            }
          }),
        });
      })
      .catch(this.setError);
  };

  displayToggle = () => {
    this.setState({
      ...this.state,
      displayed: !this.state.displayed,
    });
  };

  componentDidMount() {
    this.getAll();
  }
  render() {
    return (
      <div>
        <div id="error"> {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {this.state.todoList.reduce((acc, todo) => {
            if (this.state.displayed || todo.completed)
              return acc.concat(
                <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>
                  {todo.name} {todo.completed ? " " : ""}{" "}
                </div>
              );
            return acc;
          }, [])}
        </div>
        <Form
          formSubmit={this.formSubmit}
          todoName={this.todoName}
          nameChange={this.nameChange}
          toggleCompleted={this.toggleCompleted}
          displayed={this.state.displayed}
        />
      </div>
    );
  }
}
