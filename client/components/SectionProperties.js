import {Form} from 'semantic-ui-react';

class SectionProperties extends Component {
  handleSectionProperty = (property) => {
    return((event) => {
      this.props.onSectionPropertiesChange({[property]: event.target.value});
    });
  }

  render() {
    return(
      <Form>
        <Form.Group inline>
          <Form.Input label='Title' value={this.props.section.title} onChange={this.handleSectionProperty('title')} />
          <Form.Input label='Color' value={this.props.section.color} onChange={this.handleSectionProperty('color')} />
        </Form.Group>
      </Form>
    );
  }
}

export default SectionProperties;
