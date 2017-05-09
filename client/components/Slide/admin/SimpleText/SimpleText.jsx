import {Component} from 'react';
import Input from 'react-toolbox/lib/input';

class SimpleText extends Component{
    handleContentChange = (value) => {
        this.props.onChange({content: {text: value}});
    }

    render() {
        return(
            <Input type='text' multiline className='wide' value={this.props.content.text}
                   onChange={this.handleContentChange} />
        );
    }
}

function getInitialState() {return({text: ''});}

export default {SimpleText, getInitialState};
