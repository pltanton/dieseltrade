import {Component} from 'react';
import {SectionsContainer, Section, Header} from 'react-fullpage';
import Slide from './Slide/Slide.jsx';
import Menu from './Menu/Menu.jsx';
import {colorToString} from '../Utils.jsx';
import styles from './styles.css';

class FullPage extends Component {
    constructor(props) {
        super(props);
        this.state = {data: {sections: []}};
    }

    componentWillMount() {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            this.setState({data: JSON.parse(xhr.responseText)});
        });
        xhr.open('GET', '/api/data', true);
        xhr.send();
    }

    // Returns a handler, which should be provided to section by ID.
    // Returned hadler sets a new context for idx's section.
    handleContentChange = (idx) => {
        return((newContent) => {
            let sections = this.state.data.sections.slice();
            let oldContent = sections[idx].slide.content;
            sections[idx].slide.content = Object.assign(oldContent, newContent);
            this.setState({data: {sections: sections}});
        });
    }

    // Returned handler, which updates section properties
    handleSectionPropertiesChange = (idx) => {
        return((newProperties) => {
            let sections = this.state.data.sections.slice();
            Object.assign(sections[idx], newProperties);
            this.setState({data: {sections: sections}});
        });
    }

    // Send POSTR request to the server to set current sections state as data. That operation cannot be undone
    handleSave = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/data', true);
        xhr.send(JSON.stringify(this.state.data));
    }

    render() {
        const slides = this.state.data.sections.map((section, idx) => {
            let style;
            if(section.bgimage) {
                style = {
                    backgroundImage: `url(${section.bgimage})`,
                    backgroundSize: 'cover',
                };
            }

            return(
                // That wrapper is used to set background image
                <div style={style} key={idx}>
                    <Section color={section.usecolor ? colorToString(section.color) : undefined} >
                        <Slide admin={this.props.admin} section={section}
                            onContentChange={this.handleContentChange(idx)}
                            onSectionPropertiesChange={this.handleSectionPropertiesChange(idx)} />
                    </Section>
                </div>
                );
        });

        let fullPageOptions = {
            sectionClassName:     styles.Section,
            anchors:              this.state.data.sections.map((e) => e.anchor),
            scrollBar:            false,
            paddingTop:           60,
            navigation:           true,
            verticalAlign:        true,
            arrowNavigation:      true
        };

        return (
            <div>
                <Header>
                    <Menu admin={this.props.admin} sections={this.state.data.sections} onSave={this.handleSave} />
                </Header>
                <SectionsContainer className="container" {...fullPageOptions}>
                    {slides}
                </SectionsContainer>
            </div>
        );
    }
}

export default FullPage;

