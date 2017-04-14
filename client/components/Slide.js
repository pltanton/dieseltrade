import SectionProperties from './SectionProperties';
import {Icon, Container, Form, TextArea} from 'semantic-ui-react';

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
        <TextArea value={this.props.content.text} onChange={this.handleContentChange} />
      </Form>
    );
  }
}

function AdminBar(props) {
  let settingIcon;

  if(props.edit) {
    settingIcon = <Icon link name='asterisk' onClick={props.onSettingsToggle} />;
  } else {
    settingIcon = <Icon link name='setting' className='cog' onClick={props.onSettingsToggle} />;
  }

  return(
    <div className='admin-panel'>{settingIcon}</div>
  );
}

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false }
  }

  handleSettingsToggle = () => {
    this.setState({edit: !this.state.edit});
  }

  render() {
    const slide = this.props.section.slide;
    var SlideElement;
    switch(slide.type) {
      case "simple text":
        SlideElement = this.state.edit ? SimpleTextEdit : SimpleText;
        break;
      default:
        SlideElement = null;
    }

    return(
      <div className='slide'>
        {this.props.admin ? <AdminBar edit={this.state.edit} onSettingsToggle={this.handleSettingsToggle} /> : null}
        <Container text>
          {this.state.edit && <SectionProperties section={this.props.section}
                                                 onSectionPropertiesChange={this.props.onSectionPropertiesChange}/>}
          <SlideElement content={slide.content} onContentChange={this.props.onContentChange} />
        </Container>
      </div>
    );
  }
}

export default Slide;
