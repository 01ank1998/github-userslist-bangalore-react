import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactList from './utils/ContactsAPI';
import {Route} from 'react-router-dom';
class App extends Component {
  state = {
    contacts : []
  }

 removeContact = (contact) =>{
   this.setState((state) =>({
     contacts: state.contacts.filter(c => c.id!==contact.id)
   }))
   ContactList.remove(contact)
 }
 componentDidMount(){
  ContactList.getAll().then((contacts)=>{
    this.setState({contacts})
  })
}
onCreateContact(contact){
  ContactList.create(contact).then(contact=>{
    this.setState(state=>({
      contacts: state.contacts.concat([contact])
    }))
  })
}
  render() {
    return (
      <div className = 'App'>
      <Route exact path='/' render ={()=>(
        <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts} navigate={this.navigate}/>
      )}/>
      <Route path = '/create' render = {({history})=>(
        <CreateContact onCreateContact = {(contact) => 
          {this.onCreateContact(contact) 
            history.push('/')
          } } />
       
      )}/>
     
   
     </div>
    )
  }
}

export default App;
