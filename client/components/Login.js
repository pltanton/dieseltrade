import {Form, Card, Grid, Container, Message} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import cookie from 'react-cookie'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {password: "", login: "", badLogin: false};
  }

  handleLoginChange = (e) => {
    this.setState({login:  e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let {login, password} = this.state;
    let uriParams = `login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/session?${uriParams}`, true);
    let self = this;
    xhr.onreadystatechange = function() {
      if(this.readyState == 4) {
        console.log(this);
        if(this.status == 202) {
          let jwt = xhr.responseText;
          cookie.save('JWT', jwt, { path: '/' });
          window.location = '/admin'
        } else {
          self.setState({badLogin: true});
        }
      }
    };
    xhr.send();
  }

  render() {
    return(
			<div className='Login' onSubmit={this.handleSubmit} >
				<Card>
					<Card.Content>
						<Form>
              {this.state.badLogin && <Message negative>Wrong login or password.</Message>}
							<Form.Input label='Login' autoFocus value={this.state.name}
                          onChange={this.handleLoginChange} />
							<Form.Input label='Password' value={this.state.password} onChange={this.handlePasswordChange}
                          type='password' />
							<Form.Button content='LOGIN' fluid color='blue' />
						</Form>
					</Card.Content>
				</Card>
			</div>
    );
  }
}

export default Login;
