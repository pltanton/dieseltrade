import {Component} from 'react';
import {MdDelete} from 'react-icons/lib/md';
import {Row, Col} from 'react-flexbox-grid';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import styles from './styles.css';

class Image extends Component {
    handleCallback = (callback) => {
        return(() => {
            callback(this.props.src);
        });
    }

    render() {
        return(
            <div className={styles.Image}>
                <div onClick={this.handleCallback(this.props.onSelect)}>
                    <img className={styles.smallImage} alt={this.props.src}
                         src={`/file/${this.props.src}`} />
                     <div className={styles.imageName}
                          children={this.props.src} />
                </div>
                <MdDelete className={styles.deleteButton} onClick={this.handleCallback(this.props.onDelete)} />
            </div>
        );
    }
}

class FileManager extends Component {
    constructor(props) {
        super(props);
        this.state = {index: [], toUpload: [], waitUpload: false, filesDisplay: ''};
    }

    componentWillMount() {
        this.updateIndex();
    }

    updateIndex = () => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            this.setState({index: JSON.parse(xhr.responseText)});
        };
        xhr.open('GET', '/api/filesindex');
        xhr.send();
    }


    handleDeletion = (src) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            this.updateIndex();
        };
        xhr.open('DELETE', `api/file/${src}`);
        xhr.send();
    }

    handleSelect = (src) => {
        this.props.onSelect && this.props.onSelect(`/file/${src}`);
    }

    handleUploadSelect = (value, event) => {
        this.setState({toUpload: event.target.files, filesDisplay: value});
    }

    handleUpload = () => {
        let formData = new FormData();
        for (var file of this.state.toUpload) {
            formData.append(file.name, file);
        }
        this.setState({waitUpload: true});

        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'api/file');
        xhr.onload = () => {
            this.updateIndex();
            this.setState({waitUpload: false, filesDisplay: '', toUpload: []});
        };
        xhr.send(formData);
    }

    render() {
        let images = this.state.index.map((val) => {
            return(<Image src={val} onDelete={this.handleDeletion}
                          onSelect={this.handleSelect}
                          key={val} />);
        });

        return(
            <Dialog active={this.props.active}
                    onOverlayClick={this.props.onOverlayClick}
                    onEscKeyDown={this.props.onEscKeyDown}
                    title='File manager' >
                <Row className={styles.imageBox}>
                    {images}
                </Row>
                <Row middle='xs' >
                    <Col xs>
                        <Input type='file' multiple accept='image/*'
                               value={this.state.filesDisplay}
                               onChange={this.handleUploadSelect} />
                    </Col>
                    <Col>
                        <Button raised primary label='upload'
                                onClick={this.handleUpload}
                                disabled={this.state.toUpload.length < 1} />
                    </Col>
                </Row>
                { this.state.waitUpload && 
                <div className={styles.overlay} >
                    <ProgressBar multicolor type="circular"
                                 mode="indeterminate" />
                </div>
                }
            </Dialog >
        );
    }
}

export default FileManager;
