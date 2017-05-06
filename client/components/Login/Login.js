import {Redirect} from 'react-router-dom'
import {Card, CardText, CardTitle} from 'react-toolbox/lib/card'
import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'
import cookie from 'react-cookie'
import styles from './styles.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {password: "", login: "", badLogin: false};
  }

  handleLoginChange = (value) => {
    this.setState({login:  value});
  }

  handlePasswordChange = (value) => {
    this.setState({password: value});
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
			<div className={styles.wrapper} >
				<Card className={styles.loginCard} >
          <CardTitle title='Log in, please'/>
					<CardText>
            {this.state.badLogin && <Message negative>Wrong login or password.</Message>}
            <Input label='Login' autoFocus value={this.state.name} onChange={this.handleLoginChange} />
            <Input label='Password' value={this.state.password} onChange={this.handlePasswordChange} type='password' />
            <Button label='Login' raised primary onClick={this.handleSubmit} />
					</CardText>
				</Card>
			</div>
    );
  }
}

export default Login;
