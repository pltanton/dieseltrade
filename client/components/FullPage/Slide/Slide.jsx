import {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {FaEdit, FaEye} from 'react-icons/lib/fa';

import SectionProperties from '../SectionProperties/SectionProperties.jsx';
import SLIDE_TYPES_MAP from './types.jsx';
import styles from './styles.css';

function AdminBar(props) {
    let settingIcon;

    if(props.edit) {
        settingIcon = <FaEye onClick={props.onSettingsToggle} />;
    } else {
        settingIcon = <FaEdit onClick={props.onSettingsToggle} />;
    }

    return(
        <div className={styles.AdminPanel}>{settingIcon}</div>
    );
}

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {edit: false};
    }

    handleSettingsToggle = () => {
        this.setState({edit: !this.state.edit});
    }

    render() {
        const slide = this.props.section.slide;
        let SlideElement = SLIDE_TYPES_MAP[slide.type][this.state.edit ? 'edit' : 'normal'];

        return(
            <div className='slide' >
                {this.props.admin ? <AdminBar edit={this.state.edit} onSettingsToggle={this.handleSettingsToggle} /> : null}
                {this.state.edit && <SectionProperties section={this.props.section}
                    onSectionPropertiesChange={this.props.onSectionPropertiesChange}/>}
                <Row center='xs'>
                    <Col xs={12} md={9} lg={8} >
                        <SlideElement content={slide.content} onContentChange={this.props.onContentChange} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Slide;
