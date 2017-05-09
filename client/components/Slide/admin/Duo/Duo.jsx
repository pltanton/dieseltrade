import {Row, Col} from 'react-flexbox-grid';
import Input from 'react-toolbox/lib/input';
import Switch from 'react-toolbox/lib/switch';
import Button from 'react-toolbox/lib/button';
import Slider from 'react-toolbox/lib/slider';

import FileManager from '../../../FileManager/FileManager.jsx';
import Slide from '../Slide.jsx';

class Duo extends Slide {
    constructor(props) {
        super(props);
        this.state = {displayFM: false};
    }

    handleFMToggle = () => {
        this.setState({displayFM: !this.state.displayFM});
    }

    handleImageSelect = (src) => {
        this.handleFMToggle();
        this.handleContentChange('image')(src);
    }

    render() {
        const imageBlock = <Col xs={5}>
            <Row middle='xs'>
                <Input label='Image' value={this.props.content.image}
                       onChange={this.handleContentChange('image')} />
                <Button icon='folder' floating mini
                        onClick={this.handleFMToggle} />
            </Row>
        </Col>;
        const textBlock = <Col xs={5}>
            <Input label='Text' value={this.props.content.text}
                   onChange={this.handleContentChange('text')}
                   multiline />
        </Col>;

        return(
            <div>
                <Row>
                    <Col xs>
                        <Input label='Header' value={this.props.content.header}
                               onChange={this.handleContentChange('header')} />
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <p> Image size </p>
                        <Slider
                            pinned
                            snaps
                            min={1}
                            max={11}
                            step={1}
                            value={this.props.content.imageSize}
                            onChange={this.handleContentChange('imageSize')}/>
                    </Col>
                </Row>
                <Row center='xs' middle='xs'>
                    {this.props.content.textFirst ? textBlock : imageBlock}
                    <Col xs={2} >
                        <Switch checked={this.props.content.textFirst}
                                onChange={this.handleContentChange('textFirst')} />
                    </Col>
                    {this.props.content.textFirst ? imageBlock : textBlock}
                </Row>
                <Row>
                    <Col xs>
                        <Input label='Footer' value={this.props.content.footer}
                               onChange={this.handleContentChange('footer')} />
                    </Col>
                </Row>

                <FileManager active={this.state.displayFM}
                             onOverlayClick={this.handleFMToggle}
                             onEscKeyDown={this.handleFMToggle}
                             onSelect={this.handleImageSelect}/>
            </div>
        );
    }
}

function getInitialState() {
    return({
        header: '',
        footer: '',
        image: '',
        text: '',
        imageSize: 7,
        textFirst: true,
    });
}

export default {Duo, getInitialState};
