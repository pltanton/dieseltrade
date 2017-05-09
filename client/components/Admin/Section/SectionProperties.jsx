import {Component} from 'react';
import {ChromePicker} from 'react-color';
import {Row, Col} from 'react-flexbox-grid';
import Input from 'react-toolbox/lib/input';
import Checkbox from 'react-toolbox/lib/checkbox';
import Button from 'react-toolbox/lib/button';

import {colorToString} from '../../Utils.jsx';
import FileManager from '../../FileManager/FileManager.jsx';
import styles from './styles.css';


class SectionProperties extends Component {
    constructor(props) {
        super(props);
        this.state = {displayColorPicker: false, displayFM: false};
    }

    handleInputChange = (inputName) => {
        return((value) => {
            this.props.onChange({[inputName]: value});
        });
    }

    handleColorChange = (color) => {
        this.props.onChange({color: color.rgb});
    }

    handleColorPickerToggle = () => {
        this.setState({displayColorPicker: !this.state.displayColorPicker});
    }

    handleFMToggle = () => {
        this.setState({displayFM: !this.state.displayFM});
    }

    handleImageSelect = (src) => {
        this.handleFMToggle();
        this.handleInputChange('bgimage')(src);
    }

    render() {
        return(
            <Row middle='xs' >
                <Col xs className={styles.inlineForm}>
                    <Input type='text' label='Title' value={this.props.title}
                           onChange={this.handleInputChange('title')} />
                    <div className={styles.pair} >
                        <Input
                            type='text' label='Color'
                            value={colorToString(this.props.color)}
                            readOnly
                            disabled={!this.props.usecolor}
                            onClick={this.handleColorPickerToggle}
                        />
                        <Checkbox 
                            className={styles.colorCheckbox}
                            checked={this.props.usecolor} 
                            onChange={this.handleInputChange('usecolor')}
                        />
                        {
                            this.state.displayColorPicker ?
                            <div className={styles.popover}>
                                <div
                                    className={styles.cover}
                                    onClick={this.handleColorPickerToggle}
                                />
                                <ChromePicker 
                                    color={this.props.color}
                                    onChange={this.handleColorChange}
                                />
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className={styles.pair} >
                        <Input type='text' label='Image'
                               value={this.props.bgimage}
                               onChange={this.handleInputChange('bgimage')} />
                        <Button icon='folder' floating mini
                                onClick={this.handleFMToggle} />
                    </div>
                    <Input type='text' label='Anchor' value={this.props.anchor}
                           onChange={this.handleInputChange('anchor')} />
                    <FileManager active={this.state.displayFM}
                                 onOverlayClick={this.handleFMToggle}
                                 onEscKeyDown={this.handleFMToggle}
                                 onSelect={this.handleImageSelect}/>
                </Col>
            </Row>
        );
    }
}

export default SectionProperties;
