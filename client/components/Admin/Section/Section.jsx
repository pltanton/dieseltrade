import {Component} from 'react';
import SectionProperties from './SectionProperties.jsx';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Tabs, Tab} from 'react-toolbox/lib/tabs';

import {SLIDE_TYPES_MAP} from '../../Slide/admin';
import styles from './styles.css';
import Slide from './Slide/Slide.jsx';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {slideIndex: 0};
    }

    handleSlideTabChange = (value) => {
        this.setState({slideIndex: value});
    }

    handleSlideChange = (idx) => {
        return((newSlideProps) => {
            let slides = this.props.slides;
            slides[idx] = Object.assign(slides[idx], newSlideProps);
            this.props.onChange({slides: slides});
        });
    }

    handleAddSlide = () => {
        let newSlide = {
            type: 'simple text',
            content: SLIDE_TYPES_MAP['simple text'].initialState()
        };
        let slides = this.props.slides;
        slides.push(newSlide);
        this.props.onChange({slides: slides});
    }

    render() {
        const slides = this.props.slides.map((slide, idx) => {
            return(
                <Tab key={idx} label={idx + 1} >
                    <Slide {...slide} onChange={this.handleSlideChange(idx)} />
                </Tab>
            );
        });
        return (
            <Grid>
                <h5> Section properties </h5>
                <Row>
                    <Col xs>
                        <SectionProperties {...this.props}
                                           onChange={this.props.onChange} />
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <Tabs index={this.state.slideIndex} className={styles.slidesTabs}
                              onChange={this.handleSlideTabChange}>
                            {slides}
                            <Tab icon='add' onClick={this.handleAddSlide} />
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Section;
