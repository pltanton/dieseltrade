import Slide from './Slide'
import Menu from './Menu'
import {SectionsContainer, Section, Header} from 'react-fullpage';

class FullPage extends Component {
  constructor(props) {
    super(props);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/data', false);
    xhr.send();
    this.state = {data: JSON.parse(xhr.responseText)}
  }

  // Returns a handler, which should be provided to section by ID.
  // Returned hadler sets a new context for idx's section.
  handleContentChange = (idx) => {
    return((newContent) => {
      let sections = this.state.data.sections.slice();
      sections[idx].slide.content = newContent;
      this.setState({data: {sections: sections}});
    });
  }

  // Returned handler, which updates section properties
  handleSectionPropertiesChange = (idx) => {
    return((newProperties) => {
      let sections = this.state.data.sections.slice();
      Object.assign(sections[idx], newProperties);
      this.setState({data: {sections: sections}});
    });
  }

  render() {
    const slides = this.state.data.sections.map((section, idx) => {
      return(
        <Section color={section.color} key={idx}>
          <Slide admin={this.props.admin} section={section}
                 onContentChange={this.handleContentChange(idx)}
                 onSectionPropertiesChange={this.handleSectionPropertiesChange(idx)} />
        </Section>
      );
    });

    let fullPageOptions = {
      sectionClassName:     'section',
      anchors:              this.state.data.sections.map((e, idx) => idx),
      scrollBar:            false,
      navigation:           true,
      verticalAlign:        true,
      arrowNavigation:      true
    };

    return (
      <div>
        <Header>
          <Menu admin={this.props.admin} sections={this.state.data.sections}/>
        </Header>
        <SectionsContainer className="container" {...fullPageOptions}>
          {slides}
        </SectionsContainer>
      </div>
    );
  }
}

export default FullPage;

