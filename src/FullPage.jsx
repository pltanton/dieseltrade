import $ from 'jquery'
import 'fullpage.js';

import React, { Component } from 'react';
import Section from './Section.jsx'

var DATA={
  "sections": [
    {
      "color": "#abc",
      "type": "simple text",
      "content": { "text": "testik1" }
    },
    {
      "color": "#ccc",
      "type": "simple text",
      "content": { "text": "testik2" }
    }
  ]
};

class FullPage extends Component {
  constructor(props) {
    super(props);
    this.state = {data: DATA};
  }

  componentDidMount() {
    $('#fullpage').fullpage({
      verticalCentered: true,
      sectionsColor: this.state.data.sections.map((e) => {return e.color}),
    });
  }

  render() {
    const sections = this.state.data.sections.map((section, index) => {
      return <Section section={section} key={index} />
    });

    console.log(sections);

    return (
      <div id="fullpage">
        {sections}
      </div>
    );
  }
}

export default FullPage;

