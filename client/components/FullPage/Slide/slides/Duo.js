import {Grid, Row, Col} from 'react-flexbox-grid';
import Input from 'react-toolbox/lib/input';
import Switch from 'react-toolbox/lib/switch';
import Slider from 'react-toolbox/lib/slider';
import styles from './styles.css';

function Duo(props) {
  const imageBlock = <Col xs={props.content.imageSize}>
    <img src={props.content.image} className={styles.fitImage} />
  </Col>;
  const textBlock = <Col xs={12 - props.content.imageSize}>
    <span>{props.content.text}</span>
  </Col>;

  return(
    <Grid>
      <Row center='xs'>
        <h1>{props.content.header}</h1>
      </Row>
      <Row>
        {props.content.textFirst ? textBlock : imageBlock}
        {props.content.textFirst ? imageBlock : textBlock}
      </Row>
      <Row center='xs'>
        <h1>{props.content.footer}</h1>
      </Row>
    </Grid>
  );
}

class DuoEdit extends Component{
  handleContentChange = (attribute) => {
    return((value) => {
      this.props.onContentChange({[attribute]: value});
    });
  }

  render() {
    const imageBlock = <Col xs={5}>
      <Input label='Image' value={this.props.content.image} onChange={this.handleContentChange('image')} />
    </Col>;
    const textBlock = <Col xs={5}>
      <Input label='Text' value={this.props.content.text} onChange={this.handleContentChange('text')} multiline />
    </Col>;

    return(
      <div>
        <Row>
          <Col xs>
            <Input label='Header' value={this.props.content.header} onChange={this.handleContentChange('header')} />
          </Col>
        </Row>
        <Row center='xs' middle='xs'>
          {this.props.content.textFirst ? textBlock : imageBlock}
          <Col xs={2} >
            <Switch checked={this.props.content.textFirst} onChange={this.handleContentChange('textFirst')} />
          </Col>
          {this.props.content.textFirst ? imageBlock : textBlock}
        </Row>
        <Row>
          <Col xs>
            <Input label='Footer' value={this.props.content.footer} onChange={this.handleContentChange('footer')} />
          </Col>
        </Row>
      </div>
    );
  }
}

function duoInitialState() {
  return({
    header: '',
    footer: '',
    image: '',
    text: '',
    imageSize: 7,
    textFirst: true,
  });
}

export {Duo, DuoEdit, duoInitialState};
