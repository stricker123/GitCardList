import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


														//card
                            const Card =(props) => {
                              return(
                                     <div style={{margin: '1cm'}}>
                                      <img width="75"  src={props.avatar_url}/>
                                        <div style={{display: "inline-block", marginLeft: 10}}>
                                         <div style={{fontSize: '.5cm', fontWeight: 'bold'}}>{props.name}</div>
                                         <div style={{fontSize: '.5cm', fontWeight: 'bold'}}>{props.company}</div>
                                        </div>
                                     </div>
                               
                             )}; 
                                     
                             const CardList =(props) =>{
                                 return( 
                                     <div>
                                       {props.cards.map(card=> <Card key = {card.id} {...card} />)//map syntax
                                     }
                                     </div>
                                       );
                             };
                                                     //Form component 
                               class Form extends React.Component{
                               state={userName:""};
                                handleSubmit = (event)=>{
                                  event.preventDefault();
                                  axios.get(`https://api.github.com/users/${this.state.userName}`)
                                  .then(resp=>{this.props.onSubmit(resp.data)});
                                  this.setState({userName: "" });
                                   };
                                 render() {
                                   return (
                                     <form id="form" onSubmit={this.handleSubmit}>
                                       <input id="input" type="text"
                                       value={this.state.userName}
                                       onChange={(event)=>this.setState({userName:event.target.value})}/>
                                       <button id="button" type="submit">Add GitHub card</button>
                                     </form>
                                 );
                               }
                             }
                             
                                           //parent
                              class App extends React.Component{
                               state={
                                cards:[]
                              }
                              addNewCard = (cardInfo) => {
                                            this.setState(prevState=>({
                                           cards:prevState.cards.concat(cardInfo)}))
                              };
                               render(){
                                return( <div id="item">
                                         <Form onSubmit={this.addNewCard}/>
                                         <CardList cards={this.state.cards}/>
                                         





                                         
                                        </div>
                                       );
                                }
                             }
                            
                             

export default App;
