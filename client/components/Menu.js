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
      <ul id="menu" className="menu">
        {menuItems}
      </ul>
    );
  }
}

export default Menu;
