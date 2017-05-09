import {Component} from 'react';
import Carousel from 'nuka-carousel';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';

import Slide from './Slide/Slide.jsx';
import styles from './styles.css';
import {colorToString} from '../../Utils.jsx';

class Section extends Component {
    render() {
        let slides = this.props.slides.map((slide, idx) => {
            return(
                <Slide {...slide} key={idx} />
            );
        });

        var Decorators = [
            {
                component: (props) => {
                    return(<FaAngleRight className={styles.nav}
                                         onClick={props.nextSlide} />);
                },
                position: 'CenterRight',
                style: {
                    padding: 20
                }
            }, {
                component: (props) => {
                    return(<FaAngleLeft className={styles.nav}
                                        onClick={props.previousSlide} />);
                },
                position: 'CenterLeft',
                style: {
                    padding: 20
                }
            }
        ];


        let sliderOptions = {
            decorators: Decorators,
            wrapAround: true,
            width: '100%',
            style: {height: '100%'},
        };

        let Wrapper;
        if(slides.length > 1) {
            Wrapper = (p) => {return(
                <Carousel {...sliderOptions} {...p}/>
            );};
        } else {
            Wrapper = (p) => {return(
                <div className={styles.regularWrapper} {...p}/>
            );};
        }

        const bgImageStyle = {
            backgroundImage: `url(${this.props.bgimage})`,
        };

        const tintStyle = {
            backgroundColor: colorToString(this.props.color)
        };

        return(
            <div className={styles.Section}>
                {
                    this.props.bgimage &&
                    <div className={styles.background} style={bgImageStyle} />
                }
                {
                    this.props.usecolor &&
                    <div className={styles.tint} style={tintStyle} />
                }
                <Wrapper >
                    {slides}
                </Wrapper>
            </div>
        );
    }
}

export default Section;
