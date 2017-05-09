import {Component} from 'react';
import MySection from './Section/Section.jsx';
import {Section, SectionsContainer} from 'react-fullpage';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {data: {sections: []}};
    }

    componentWillMount() {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            this.setState({data: JSON.parse(xhr.responseText)});
        });
        xhr.open('GET', '/api/data', false);
        xhr.send();
    }


    render() {
        const options = {
            anchors: ['one', 'two', 'three'],
            navigation: false,
            arrowNavigation: true
        };
        const sections = this.state.data.sections.map((section) => {
            return(
                <Section key={section.anchor}>
                    <MySection {...section} />
                </Section>
            );
        });

        return (
            <SectionsContainer {...options} >
                {sections}
            </SectionsContainer>
        );
    }
}

export default User;

