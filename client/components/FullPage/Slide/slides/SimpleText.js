import {Row, Col} from 'react-flexbox-grid';
import Input from 'react-toolbox/lib/input'

function SimpleText(props) {
  return(
    <span>{props.content.text}</span>
  );
}

class SimpleTextEdit extends Component{
  handleContentChange = (value) => {
    this.props.onContentChange({text: value});
  }

  render() {
    return(
      <Input type='text' multiline className='wide' value={this.props.content.text}
             onChange={this.handleContentChange} />
    );
  }
}

function simpleTextInitialState() {return({content: ''})};

export {SimpleText, SimpleTextEdit, simpleTextInitialState};
