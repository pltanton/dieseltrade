import 'fullpage.js';
import 'fullpage.js/dist/jquery.fullpage.css';

import React, { Component } from 'react';
import Section from './Section'
import Menu from './Menu'

var DATA={
  "sections": [
    {
      "title": "First",
      "color": "#abc",
      "anchor": "first-one",
      "slides": [{
        "type": "simple text",
        "content": { "text": "first slide one" },
      },
      {
        "type": "simple text",
        "content": { "text": "first slide two" },
        "active": true,
      }],
    },
    {
      "title": "Seccond",
      "color": "#ccc",
      "anchor": "seccond",
      "slides": [{
        "type": "simple text",
        "content": { "text": "testik2" },
      }],
    },
  ],
};

class FullPage extends Component {
  constructor(props) {
    super(props);
    self = this;
    $.ajax({
      url: '/api/data',
      method: 'get',
      async: false,
      success: (data) => {
        self.state = {data: data};
      }
    });
  }

  componentDidMount() {
    $('#fullpage').fullpage({
      menu: '#menu',
      anchors: this.state.data.sections.map((e) => e.anchor),

      verticalCentered: true,
      sectionsColor: this.state.data.sections.map((e) => e.color),
    });
  }

  render() {
    const sections = this.state.data.sections.map((section) => {
      return <Section admin={this.props.admin} section={section}
                      key={section.anchor} />
    });

    return (
      <div>
        <Menu sections={this.state.data.sections} />
        <div id="fullpage">
          {sections}
        </div>
      </div>
    );
  }
}

export default FullPage;

