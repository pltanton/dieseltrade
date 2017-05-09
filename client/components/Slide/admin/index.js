import SimpleText from './SimpleText/SimpleText.jsx';
import Duo from './Duo/Duo.jsx';

const SLIDE_TYPES_MAP = {
    'simple text': {
        component: SimpleText.SimpleText,
        displayName: 'Simple text',
        initialState: SimpleText.getInitialState
    },
    'duo': {
        component: Duo.Duo, 
        displayName: 'Dual slide',
        initialState: Duo.getInitialState
    }
};

export {
    SimpleText,
    Duo,
    SLIDE_TYPES_MAP
};

