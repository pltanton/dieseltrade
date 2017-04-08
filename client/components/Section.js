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
    <div className="slide" data-anchor={`#${slide.anchor}`}>
      <SlideElement content={slide.content} />
    </div>
  );
}

function SimpleText(props) {
  return (
    <span>{props.content.text}</span>
  );
}

class Section extends Component {
  render() {
    const section = this.props.section;
    const slides = section.slides.map((e, index) => {
      return(<Slide slide={e} key={index}/>);
    });

    return (
      <div className="section">
        {slides}
      </div>
    );
  }
}

export default Section;
