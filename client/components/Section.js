import React, { Component } from 'react';

function Slide(props) {
  const slide = props.slide;
  var SlideElement;
  switch(slide.type) {
    case "simple text":
      SlideElement = SimpleText;
      break;
    default:
      SlideElement = null;
  }

  return(
    <div className={`slide ${slide.active ? 'active' : ''}`} data-anchor={`#${props.anchor}`}>
      {props.admin ? <AdminBar/> : null}
      <SlideElement content={slide.content} />
    </div>
  );
}

function SimpleText(props) {
  return(
    <span>{props.content.text}</span>
  );
}

function AdminBar(props) {
  return(
    <div className='admin-panel'>
      Ololo
    </div>
  );
}

class Section extends Component {
  render() {
    const section = this.props.section;
    const slides = section.slides.map((e, index) => {
      return(<Slide admin={this.props.admin} slide={e} key={index} anchor={index}/>);
    });

    return (
      <div className="section">
        {slides}
      </div>
    );
  }
}

export default Section;
