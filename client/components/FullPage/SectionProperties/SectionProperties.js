import {ChromePicker} from 'react-color';
import {Row, Col} from 'react-flexbox-grid';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import Dropdown from 'react-toolbox/lib/dropdown';

import SLIDE_TYPES_MAP from '../Slide/types';
import {colorToString} from '../../Utils';
import styles from './styles.css';

const TYPES = Object.entries(SLIDE_TYPES_MAP).map((val) => {
  return({value: val[0], label: val[1].displayName});
});


class SectionProperties extends Component {
  constructor(props) {
    super(props);
    this.state = { displayColorPicker: false, backup: {} }
  }

  handleInputChange = (inputName, value) => {
    return (value) => {
      this.props.onSectionPropertiesChange({[inputName]: value})
    }
  }

  handleColorChange = (color) => {
    this.props.onSectionPropertiesChange({color: color.rgb});
  }

  handleColorPickerToggle = () => {
    this.setState({displayColorPicker: !this.state.displayColorPicker});
  }

  handleTypeChange = (newType) => {
    this.setState({backup: Object.assign(this.state.backup,
                                         {[this.props.section.slide.type]: this.props.section.slide})});
    let newSlide;
    if(this.state.backup[newType]) {
      newSlide = this.state.backup[newType];
    } else {
      newSlide = {type: newType, content: SLIDE_TYPES_MAP[newType].initialState()};
    }
    console.log(newSlide);
    this.props.onSectionPropertiesChange({slide: newSlide})
  }

  render() {
    const ColorGroup = <Row style={{position: 'relative'}}>
      <Input type='text' label='Color' value={colorToString(this.props.section.color)} readOnly
             disabled={!this.props.section.usecolor} onClick={this.handleColorPickerToggle} />
      <Checkbox checked={this.props.section.usecolor} onChange={this.handleInputChange('usecolor')}
                style={{marginTop: '30px'}} />
      {
        this.state.displayColorPicker ? <div className={styles.popover}>
          <div className={styles.cover} onClick={this.handleColorPickerToggle} />
          <ChromePicker color={this.props.section.color} onChange={this.handleColorChange} />
        </div>: null
      }
    </Row>;

    return(
      <Row around='xs' className={styles.SectionProperties} >
        <Col xs={2} >
          <Input type='text' label='Title' value={this.props.section.title}
                 onChange={this.handleInputChange('title')} />
        </Col>
        <Col xs={4} >
          {ColorGroup}
        </Col>
        <Col xs={2} >
          <Input type='text' label='Image' value={this.props.section.bgimage}
                 onChange={this.handleInputChange('bgimage')} />
        </Col>
        <Col xs={2} >
          <Input type='text' label='Anchor' value={this.props.section.anchor}
                 onChange={this.handleInputChange('anchor')} />
        </Col>
        <Col xs={2} >
          <Dropdown label='Type' source={TYPES} value={this.props.section.slide.type}
                    onChange={this.handleTypeChange} />
        </Col>
      </Row>
    );
  }
}

export default SectionProperties;
