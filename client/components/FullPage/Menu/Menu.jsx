import {Component} from 'react';
import {MdSave} from 'react-icons/lib/md';
import {FaFolder} from 'react-icons/lib/fa';
import Dialog from 'react-toolbox/lib/dialog';

import FileManager from '../../FileManager/FileManager.jsx'
import styles from './styles.css';

function MenuItem(props) {
    return(
        <li data-menuanchor={props.anchor}>
            <a href={`#${props.anchor}`}>{props.title}</a>
        </li>
    );
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {displayFileManager: false};
    }

    handleFileManagerToggle = () => {
        this.setState({displayFileManager: !this.state.displayFileManager});
    }

    render() {
        var menuItems = this.props.sections.map((section) => {
            return(<MenuItem anchor={section.anchor} title={section.title} key={section.anchor}/>);
        });
        return(
            <div className={styles.Menu}>
                <ul>
                    {menuItems}
                </ul>
                <ul>
                    <li><MdSave onClick={this.props.onSave} /></li>
                </ul>
                <ul>
                    <li><FaFolder onClick={this.handleFileManagerToggle} /></li>
                </ul>
                <Dialog active={this.state.displayFileManager}
                        onOverlayClick={this.handleFileManagerToggle}
                        onEscKeyDown={this.handleFileManagerToggle}
                        title='File manager'>
                    <FileManager/>
                </Dialog>
            </div>
        );
    }
}

export default Menu;
