import {Icon} from 'semantic-ui-react';

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
      <div className="Menu">
        <ul>
          {menuItems}
        </ul>
        <ul>
          <li><Icon link name='save' onClick={this.props.onSave} /></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
