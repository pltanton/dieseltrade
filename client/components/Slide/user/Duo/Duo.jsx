import {Row, Col} from 'react-flexbox-grid';

import styles from './styles.css';

function Duo(props) {
    const imageBlock = <Col xs={props.content.imageSize}>
        <img src={props.content.image} className={styles.fitImage} />
    </Col>;
    const textBlock = <Col xs={12 - props.content.imageSize}>
        <span>{props.content.text}</span>
    </Col>;

    return(
        <div>
            <div className={styles.header}>
                <h1>{props.content.header}</h1>
            </div>
            <Row center='xs'>
                {props.content.textFirst ? textBlock : imageBlock}
                {props.content.textFirst ? imageBlock : textBlock}
            </Row>
            <div className={styles.footer}>
                <h1>{props.content.footer}</h1>
            </div>
        </div>
    );
}
export default Duo;
