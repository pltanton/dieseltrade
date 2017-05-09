import {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Admin from './Admin/Admin.jsx';
import User from './User/User.jsx';
import Login from './Login/Login.jsx';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={User} />
                    <Route exact path="/admin" render={() => <Admin admin={true} />} />
                    <Route exact path="/login" render={() => <Login />} />
                </div>
            </Router>
        );
    }
}

export default App;
