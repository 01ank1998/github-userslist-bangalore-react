import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Escaperegexp from 'escape-string-regexp';
import Pagination from "react-paginating";

class ListContacts extends Component{
    static propTypes = {
        contact : PropTypes.array.isRequired
    }

    state = {
        query : '',
        contacts : [],
        
    }
    
    //updating the query 
    updateQuery = (quer) => {
        this.setState({query:quer.trim()})
    }
    
    //updating the data in the page
    handlePageChange = (page,e) => {
        this.fetchData(page)
      }
    
    fetchData(page){
        fetch(`https://api.github.com/search/users?q=location:bangalore&page=${page}`)
        .then(response => response.json())
        .then(data => 
          this.setState({contacts:data.items}))
      }

    componentDidMount(){
        fetch(`https://api.github.com/search/users?q=location:bangalore&page=1`)
         .then(response => response.json())
         .then(data => 
           this.setState({contacts:data.items}))
     }
     

    render(){
        const {contacts,currentPage} = this.state
        const {query} = this.state
        
        let showingContacts 
        

        if(query)
        {
            const match = new RegExp(Escaperegexp(query),'i')
            showingContacts = contacts.filter((contact)=>match.test(contact.login))
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
                        backgroundImage : `url(${contact.avatar_url})`
                    }}/>
                    <a className='contact-details' href={contact.html_url} target="_blank">{contact.login}</a>
                   
                    </li>
                    
                ))
            }
            </ol>
            <Pagination
                    total={1000}
                    limit={30}
                    pageCount={10}
                    currentPage={currentPage}
                    >
                    {({
                        pages,
                        currentPage,
                        hasNextPage,
                        hasPreviousPage,
                        previousPage,
                        nextPage,
                        totalPages,
                        getPageItemProps
                    }) => (
                        <div class = "page">
                        <button class = "btn"
                            {...getPageItemProps({
                            pageValue: 1,
                            onPageChange: this.handlePageChange
                            })}
                        >
                            first
                        </button>

                        {hasPreviousPage && (
                            <button class = "btn"
                            {...getPageItemProps({
                                pageValue: previousPage,
                                onPageChange: this.handlePageChange
                            })}
                            >
                            {"<"}
                            </button>
                        )}

                        {pages.map(page => {
                            let activePage = null;
                            if (currentPage === page) {
                            activePage = { backgroundColor: "#fdce09" };
                            }
                            return (
                            <button class = "btn"
                                {...getPageItemProps({
                                pageValue: page,
                                key: page,
                                style: activePage,
                                onPageChange: this.handlePageChange
                                })}
                            >
                                {page}
                            </button>
                            );
                        })}

                        {hasNextPage && (
                            <button  class = "btn"
                            {...getPageItemProps({
                                pageValue: nextPage,
                                onPageChange: this.handlePageChange
                            })}
                            >
                            {">"}
                            </button>
                        )}

                        <button  class = "btn"
                            {...getPageItemProps({
                            pageValue: totalPages,
                            onPageChange: this.handlePageChange
                            })}
                        >
                            last
                        </button>
                        </div>
                    )}
             </Pagination>
        </div>
            
        )
    }
}


export default ListContacts