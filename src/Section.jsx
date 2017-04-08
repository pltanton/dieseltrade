import React, { Component } from 'react';

function SimpleText(props) {
  return (
    <p>{props.content.text}</p>
  );
}

class Section extends Component {
  render() {
    const section = this.props.section;
    var SectionElement;
    switch(section.type) {
      case "simple text":
        SectionElement = SimpleText;
        break;
      default:
        SectionElement = null;
    }
    return (
      <div className="section">
        <SectionElement content={section.content} />
      </div>
    );
  }
}

export default Section;
