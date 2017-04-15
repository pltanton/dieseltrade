import SectionProperties from './SectionProperties';
import {Icon, Container} from 'semantic-ui-react';
import {SimpleText, SimpleTextEdit} from './slides/SimpleText'

const SLIDE_TYPE_MAP = {
  'simple text': [SimpleText, SimpleTextEdit]
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
    let SlideElement = SLIDE_TYPE_MAP[slide.type][this.state.edit ? 1 : 0];

    return(
      <div className='slide' >
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
