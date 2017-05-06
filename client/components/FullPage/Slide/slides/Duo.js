import {Row, Col} from 'react-flexbox-grid';

function Duo(props) {
  return(
    <span>{props.content.text}</span>
  );
}

class DuoEdit extends Component{
  handleContentChange = (event) => {
    this.props.onContentChange({text: event.target.value});
  }

  render() {
    return(
      <Row center='xs'>
        <Col xs={12} md={9}>
          <textarea className='wide' value={this.props.content.text} onChange={this.handleContentChange} />
        </Col>
      </Row>
    );
  }
}

function duoInitialState() {return({content: 'initial state for dual'});}

export {Duo, DuoEdit, duoInitialState};
