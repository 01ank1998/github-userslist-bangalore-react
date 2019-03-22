import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Escaperegexp from 'escape-string-regexp';
import {Link} from 'react-router-dom';
import Sortby from 'sort-by';

class ListContacts extends Component{
    static propTypes = {
        contact : PropTypes.array.isRequired,
        onDeleteContact : PropTypes.func.isRequired
    }
    state = {
        query : ''
    }
    updateQuery = (quer) => {
        this.setState({query:quer.trim()})
    }
    

    render(){
        const {contacts,onDeleteContact} = this.props
        const {query} = this.state
        let showingContacts 
        if(query)
        {
            const match = new RegExp(Escaperegexp(query),'i')
            showingContacts = contacts.filter((contact)=>match.test(contact.name))
        }
        else
        {
            showingContacts = contacts
        }
        const showAll = (() => {
            this.setState({
                query : ''
            })
        })
        showingContacts.sort(Sortby('name'))

        return(
            <div className = 'list-contacts'>
            <div className= 'list-contacts-top'>
               <input 
                  className = 'search-contacts'
                  type = 'text'
                  placeholder = 'Search'
                  value = {query}
                  onChange = {(event)=>this.updateQuery(event.target.value)}
                  />
                  <Link
                  to = '/create' 
                  className = 'add-contact'
                  >Add contact</Link>

            </div>
            { (showingContacts.length!==contacts.length) && (
                <div className = 'showing-contacts'>
                  <span>Showing {showingContacts.length} of {contacts.length}</span>
                  <button onClick={showAll}>Show all</button>
                </div>
            )

            }
            <ol className = 'contact-list'>
            {
                showingContacts.map(contact =>(
                    <li key = {contact.id} className = 'contact-list-item'>
                    <div className='contact-avatar' style={{
                        backgroundImage : `url(${contact.avatarURL})`
                    }}/>
                    <div className='contact-details'>{contact.name}</div>
                    <button onClick= {() => onDeleteContact(contact)}  className='contact-remove'>Remove Button</button>
                    </li>
                ))
            }
            </ol>
            </div>
        )
    }
}


export default ListContacts