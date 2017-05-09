import {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import Dropdown from 'react-toolbox/lib/dropdown';

import {SLIDE_TYPES_MAP} from '../../../Slide/admin';

const TYPES = Object.entries(SLIDE_TYPES_MAP).map((val) => {
    return({value: val[0], label: val[1].displayName});
});

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {backup: {}};
    }

    handleTypeChange = (newType) => {
        this.setState({backup: Object.assign(
            this.state.backup,
            {[this.props.type]: {
                type: this.props.type,
                content: this.props.content
            }}
        )});
        let newSlide;
        if(this.state.backup[newType]) {
            newSlide = this.state.backup[newType];
        } else {
            newSlide = {
                type: newType,
                content: SLIDE_TYPES_MAP[newType].initialState()
            };
        }
        this.props.onChange(newSlide);
    }

    render() {
        const SlideComponent = SLIDE_TYPES_MAP[this.props.type].component;
        return (
            <div>
                <Row>
                    <Col xs>
                        <Dropdown label='Type' source={TYPES}
                                  value={this.props.type}
                                  onChange={this.handleTypeChange} />
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <SlideComponent {...this.props} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Section;
