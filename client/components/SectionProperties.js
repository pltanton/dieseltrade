import {Form, Popup} from 'semantic-ui-react';
import {ChromePicker} from 'react-color';
import {colorToString} from './Utils';

class SectionProperties extends Component {
  constructor(props) {
    super(props);
  }

  handleTitleChange = (event) => {
    this.props.onSectionPropertiesChange({title: event.target.value});
  }

  handleImageChange = (event) => {
    this.props.onSectionPropertiesChange({bgimage: event.target.value});
  }

  handleColorChange = (color) => {
    this.props.onSectionPropertiesChange({color: color.rgb});
  }

  handleColorToggle = (event) => {
    this.props.onSectionPropertiesChange({usecolor: !this.props.section.usecolor});
  }


  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    };
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };
    const InputColor = <Form.Input value={colorToString(this.props.section.color)} readOnly
                                   disabled={!this.props.section.usecolor}/>;
    const ColorGroup = <Form.Field>
      <label> Color </label>
      <Form.Group inline>
        <Popup trigger={InputColor} hoverable hideOnScroll on='click'>
          <Popup.Content>
            <ChromePicker color={this.props.section.color}
                          onChange={this.handleColorChange}/>
          </Popup.Content>
        </Popup>
        <Form.Checkbox toggle fitted checked={this.props.section.usecolor} onClick={this.handleColorToggle}/>
      </Form.Group>
    </Form.Field>;

    return(
      <Form>
        <Form.Group>
          <Form.Input label='Title' value={this.props.section.title} onChange={this.handleTitleChange} />
          {ColorGroup}
          <Form.Input label='Image' value={this.props.section.bgimage} onChange={this.handleImageChange} />
        </Form.Group>
      </Form>
    );
  }
}

export default SectionProperties;
