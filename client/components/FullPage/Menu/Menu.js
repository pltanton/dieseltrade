import {MdSave} from 'react-icons/lib/md';
import styles from './styles.css'

function MenuItem(props) {
  return(
    <li data-menuanchor={props.anchor}>
      <a href={`#${props.anchor}`}>{props.title}</a>
    </li>
  );
}

class Menu extends Component {
  render() {
    var menuItems = this.props.sections.map((section) => {
      return(<MenuItem anchor={section.anchor} title={section.title} key={section.anchor}/>);
    });
    return(
      <div className={styles.Menu}>
        <ul>
          {menuItems}
        </ul>
        <ul>
          <li><MdSave onClick={this.props.onSave} /></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
