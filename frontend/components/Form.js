import React from 'react'

export default class Form extends React.Component {
  render() {
    
    return (
      <>
        <form id = "todoForm" onSubmit = {this.props.formSubmit}>
        <input
        value = {this.props.todoName}
        onChange = {this.props.nameChange}
         type = 'text'
         placeholder = 'type todo'
         /> 

        <input 
        type = 'submit'
        />
 
      </form>
      <button onClick= {this.props.toggleCompleted}> {this.props.displayed ? 'Hide' : 'Show' } Completed</button> 
      </>
    )
  }
}