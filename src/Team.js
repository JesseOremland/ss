import React, { Component } from 'react';
import './Team.css';

class Team extends Component {
constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      team: []
    };
    this.sortTeam = this.sortTeam.bind(this);
  }

componentDidMount() {
    fetch("https://h93rvy36y7.execute-api.us-east-1.amazonaws.com/teams" )
      .then( response => response.json() )
      .then(
        (response) => {
          this.setState({
            isLoaded: true,
            team: this.sortTeam(response)
          });
          
        },
        (error) => {
          console.log(error);
          this.setState({
            isLoaded: true, 
            error
          });
        }
      )
  }

  sortTeam(team) { 
    const members = [];
    const teams = team.filter(team => team.state === 'VA');
    teams.map(t => members.push(t.members));
    return members.reduce((a, b) => a.concat(b), []).filter(member => member.role === 'Software Engineer' || member.role === 'Technical Lead').sort((a, b) => a.firstName > b.firstName).sort((a, b) => a.lastName > b.lastName);
  } 

 render() {
    const { error, isLoaded, team } = this.state;
    if (error) {
      return <div>Error - Oops, Something happened: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading.. thank you for your patience</div>;
    } else {
      return (
        <div className="main__wrapper">
          <h1>Fictitious Company</h1>
          <h2>Team Members</h2>
          {team.map((tm, index) => (
             <div className="personRow" key={index} dangerouslySetInnerHTML={{__html: tm.firstName + ' ' + tm.lastName }} ></div>
          ))}
        </div>
      )
    }
  }
}

export default Team;