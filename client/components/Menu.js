function MenuItem(props) {
  return(
    <li data-menuanchor={props.anchor}>
      <a href={`#${props.anchor}`}>{props.title}</a>
    </li>
  );
}

class Menu extends Component {
  render() {
    var menuItems = this.props.sections.map((section, idx) => {
      return(<MenuItem anchor={idx} title={section.title} key={idx}/>);
    });
    return(
      <ul id="menu" className="menu">
        {menuItems}
      </ul>
    );
  }
}

export default Menu;
