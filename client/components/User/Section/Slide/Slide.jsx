import {Component} from 'react';

import {SLIDE_TYPES_MAP} from '../../../Slide/user';
import styles from './styles.css';

class Slide extends Component {
    render() {
        const SlideComponent = SLIDE_TYPES_MAP[this.props.type];

        return(
            <div className={styles.Slide}>
                <SlideComponent {...this.props} />
            </div>
        );
    }
}

export default Slide;
