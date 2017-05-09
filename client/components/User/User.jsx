import {Component} from 'react';
import $ from 'jquery';
import 'fullpage.js';
import {findDOMNode} from 'react-dom';
import SLIDE_TYPES_MAP from '../Slide/user/index.jsx';


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

    componentDidMount() {
        $(findDOMNode(this.refs.fullpage)).fullpage();
    }

    render() {
        const sections = this.state.data.sections.map((section, idx) => {
            const Slide = SLIDE_TYPES_MAP[section.slide.type];
            return(
                <div className='section' key={idx}>
                    <Slide content={section.slide.content} />
                </div>
            );
        });

        return (
            <div ref='fullpage'>
                {sections}
            </div>
        );
    }
}

export default User;

