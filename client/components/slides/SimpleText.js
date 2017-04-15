import {Form, TextArea} from 'semantic-ui-react';

function SimpleText(props) {
  return(
    <span>{props.content.text}</span>
  );
}

class SimpleTextEdit extends Component{
  handleContentChange = (event) => {
    this.props.onContentChange({text: event.target.value});
  }

  render() {
    return(
      <Form>
        <TextArea autoHeight value={this.props.content.text} onChange={this.handleContentChange} />
      </Form>
    );
  }
}

export {SimpleText, SimpleTextEdit};
