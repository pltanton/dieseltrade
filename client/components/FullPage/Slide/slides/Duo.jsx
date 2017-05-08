import {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import Input from 'react-toolbox/lib/input';
import Switch from 'react-toolbox/lib/switch';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';

import FileManager from '../../../FileManager/FileManager.jsx';
import styles from './styles.css';

function Duo(props) {
    const imageBlock = <Col xs={props.content.imageSize}>
        <img src={props.content.image} className={styles.fitImage} />
    </Col>;
    const textBlock = <Col xs={12 - props.content.imageSize}>
        <span>{props.content.text}</span>
    </Col>;

    return(
        <div>
            <div className={styles.header}>
                <h1>{props.content.header}</h1>
            </div>
            <Row center='xs'>
                {props.content.textFirst ? textBlock : imageBlock}
                {props.content.textFirst ? imageBlock : textBlock}
            </Row>
            <div className={styles.footer}>
                <h1>{props.content.footer}</h1>
            </div>
        </div>
    );
}

class DuoEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {displayFileManager: false};
    }

    handleContentChange = (attribute) => {
        return((value) => {
            this.props.onContentChange({[attribute]: value});
        });
    }

    handleFileManagerToggle = () => {
        this.setState({displayFileManager: !this.state.displayFileManager});
    }

    handleImageSelect = (src) => {
        this.handleFileManagerToggle();
        this.handleContentChange('image')(src);
    }

    render() {
        const imageBlock = <Col xs={5}>
            <Row middle='xs'>
                <Input label='Image' value={this.props.content.image} onChange={this.handleContentChange('image')} />
                <Button label='Select' onClick={this.handleFileManagerToggle} />
            </Row>
        </Col>;
        const textBlock = <Col xs={5}>
            <Input label='Text' value={this.props.content.text} onChange={this.handleContentChange('text')}
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
                <Dialog active={this.state.displayFileManager}
                        onOverlayClick={this.handleFileManagerToggle}
                        onEscKeyDown={this.handleFileManagerToggle}
                        title='File manager'>
                    <FileManager onSelect={this.handleImageSelect} />
                </Dialog>
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
