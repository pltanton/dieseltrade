import {SimpleText, SimpleTextEdit, simpleTextInitialState} from './slides/SimpleText';
import {Duo, DuoEdit, duoInitialState} from './slides/Duo';

const SLIDE_TYPES_MAP = {
  'simple text': {normal: SimpleText, edit: SimpleTextEdit, displayName: 'Simple text',
                  initialState: simpleTextInitialState},
  'duo': {normal: Duo, edit: DuoEdit, displayName: 'Dual slide', initialState: duoInitialState},
};

export default SLIDE_TYPES_MAP;

