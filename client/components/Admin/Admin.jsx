import {Component} from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';

import Section from './Section/Section.jsx';
import tabsTheme from './tabsTheme.css';
import navigationTheme from './navigationTheme.css';
import FileManager from '../FileManager/FileManager.jsx';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {data: {sections: []}, sectionIndex: 0, displayFM: false};
    }

    componentWillMount() {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            this.setState({data: JSON.parse(xhr.responseText)});
        });
        xhr.open('GET', '/api/data', false);
        xhr.send();
    }

    // Returns a handler, which should be provided to section by ID.
    // Returned hadler sets a new context for idx's section.
    handleContentChange = (idx) => {
        return((newContent) => {
            let sections = this.state.data.sections.slice();
            let oldContent = sections[idx].slide.content;
            sections[idx].slide.content =
                Object.assign(oldContent, newContent);
            this.setState({data: {sections: sections}});
        });
    }

    // Returned handler, which updates section properties
    handleSectionChange = (idx) => {
        return((newProperties) => {
            let sections = this.state.data.sections.slice();
            sections[idx] = Object.assign(sections[idx], newProperties);
            this.setState({data: {sections: sections}});
        });
    }

    // Send POST request to the server to set current sections state as data.
    // That operation cannot be undone
    handleSave = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/data', true);
        xhr.send(JSON.stringify(this.state.data));
    }

    handleTabSwitch = (index) => {
        this.setState({sectionIndex: index});
    }

    handleFMToggle = () => {
        this.setState({displayFM: !this.state.displayFM});
    }

    handleAddSection = () => {
        let newSection = {
            title: 'New section',
            color: {r: 0, g: 0, b: 0, a: 0},
            bgimage: '',
            anchor: 'new_section',
            slides: [],
            usecolor: false
        };
        this.state.data.sections.push(newSection);
        this.setState({data: {
            sections: this.state.data.sections
        }});
    }

    render() {
        const currentSection = 
            this.state.data.sections[this.state.sectionIndex];
        const tabs = this.state.data.sections.map((section) => {
            return(
                <Tab label={section.title} key={section.anchor}>
                    <Section
                        {...currentSection} 
                        onChange={
                            this.handleSectionChange(this.state.sectionIndex)
                        }
                    />
                </Tab>
            );
        });
        return (
            <div>
                <AppBar flat={true} >
                    <Tabs className={tabsTheme.appbarTabs} theme={tabsTheme}
                          index={this.state.sectionIndex}
                          onChange={this.handleTabSwitch} >
                        {tabs}
                        <Tab icon='add' onClick={this.handleAddSection} />
                    </Tabs>
                    <Navigation type='horizontal' 
                                className={navigationTheme.navigation}>
                        <Link icon='backup' onClick={this.handleSave} />
                        <Link icon='folder' onClick={this.handleFMToggle} />
                        <FileManager active={this.state.displayFM}
                                     onOverlayClick={this.handleFMToggle}
                                     onEscKeyDown={this.handleFMToggle} />

                    </Navigation>
                </AppBar>
            </div>
        );
    }
}

export default Admin;
