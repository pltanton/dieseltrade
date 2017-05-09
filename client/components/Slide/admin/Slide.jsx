import {Component} from 'react';

class Slide extends Component{
    constructor(props) {
        super(props);
    }

    handlePropsChange = (prop) => {
        return((value) => {
            this.props.onChange({[prop]: value});
        });
    }

    handleContentChange = (attribute) => {
        return((value) => {
            this.handlePropsChange('content')(Object.assign(this.props.content, {[attribute]: value}));
        });
    }
}

export default Slide;
