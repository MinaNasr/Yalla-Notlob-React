import AppHeader from '../components/Header';
import React, { Component } from 'react';
import './App.css';
import { Label, Card, Segment, Header, Divider, Image, Grid, Input, Menu, Icon, Form ,Container} from 'semantic-ui-react'
import FriendsList from './friendsList.js';
import axios from 'axios';
import Cookies from 'universal-cookie';

class MyFriends extends Component {
  friend = '';
  state = {
    friend: '',
  }
  componentDidMount() {

  }
  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        <AppHeader user={ this.props.user } />
        <Grid style={{ margin: '50px 50px' }}>
          <Grid.Column width={11}>
            <Card raised fluid>
              <Card.Content style={{ background: '#05396B' }}>
                <Header as='h1' style={{ color: '#FFDE00' }}>
                  <span><Icon size='small' name='users' /></span>Friends List
                </Header>
              </Card.Content>
              <Card.Content>
                <FriendsList friend={ this.state.friend } />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={5}>
            <Card raised>
              <Card.Content style={{ background: '#05396B' }}>
                <Header as='h3' style={{ color: 'white' }}><span><Icon size='small' name='add user' /></span>Add Friend</Header>
              </Card.Content>
              <Card.Content description='Type the email of your friend!' />
              <Card.Content extra>
                <Form onSubmit={this.handleAdd}>
                  <Segment basic>
                    <Form.Input icon='at'
                      placeholder='Email'
                      name='email' iconPosition='left'
                      fluid
                      required
                      onChange={ this.doChange } />
                    <Form.Button content='add' fluid color='grey' />
                  </Segment>
                </Form>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  handleAdd= () => {
    console.log(this.friend);
    const cookies = new Cookies();   

    axios({
      method:'POST',
      url:"http://localhost:3000/friends/",
      headers:{"Content-Type": "application/json",
      "Authorization":`Barear ${cookies.get("access_token")}`},
      data:{
        "email": this.friend
      }
    }).then((res) => {
      this.setState({ friend: res });
    }).catch((err) => {
      // need to display error message for the user!!!!
      console.log('err', err);
    });
  } ;
  doChange =  (e, { name, value }) => this.friend = value;
}

export default MyFriends;
