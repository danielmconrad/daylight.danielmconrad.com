import React, { Component } from 'react';
import './index.css';

class WeatherForecast extends Component {
  render() {
    //<!--
    //   min: 68   =    180px (always)
    //   min: 75   =    100px (always)

    //   80 / 7 = 11.428571429


    //   73°F  122
    //   70°F  157
    //   68°F  180
    //   70°F  157
    //   75°F  100
    //   74°F  111
    //   70°F  157

    //  -->

    // <!-- last y = 000 -->
    // <!--  new y = 122 -->
    // <!-- last x = 000 -->
    // <!--  new x = 000 -->
    // <!-- text y = 092 -->
    // <!-- text x = 000 -->

    return (
      <div className="WeatherForecast">
        <svg viewBox="-40 0 1040 330" xmlns="http://www.w3.org/2000/svg">
          <g className="legend">
            <line id="bottom-line" x1="0" x2="960" y1="235" y2="235" />
            <line id="time-marker" x1="280" x2="280" y1="210" y2="260" />
            <text x="000" y="295" textAnchor="middle">12<tspan className="small">AM</tspan></text>
            <text x="160" y="295" textAnchor="middle">4<tspan className="small">AM</tspan></text>
            <text x="320" y="295" textAnchor="middle">8<tspan className="small">AM</tspan></text>
            <text x="480" y="295" textAnchor="middle">12<tspan className="small">PM</tspan></text>
            <text x="640" y="295" textAnchor="middle">4<tspan className="small">PM</tspan></text>
            <text x="800" y="295" textAnchor="middle">8<tspan className="small">PM</tspan></text>
            <text x="960" y="295" textAnchor="middle">12<tspan className="small">AM</tspan></text>
          </g>
          <g className="precipitation">
            <rect x="40" width="40" y="225" height="10"/>
            <rect x="80" width="40" y="215" height="20"/>
          </g>
          <g className="temps">
            <text x="000" y="092" textAnchor="middle">73°F</text>
            <line x1="0" x2="0" y1="122" y2="122" />

            <text x="160" y="127" textAnchor="middle">70°F</text>
            <line x1="000" x2="160" y1="122" y2="157" />

            <text x="320" y="150" textAnchor="middle">68°F</text>
            <line x1="160" x2="320" y1="157" y2="180" />

            <text x="480" y="127" textAnchor="middle">70°F</text>
            <line x1="320" x2="480" y1="180" y2="157" />

            <text x="640" y="070" textAnchor="middle">75°F</text>
            <line x1="480" x2="640" y1="157" y2="100" />

            <text x="800" y="081" textAnchor="middle">74°F</text>
            <line x1="640" x2="800" y1="100" y2="111" />

            <text x="960" y="127" textAnchor="middle">70°F</text>
            <line x1="800" x2="960" y1="111" y2="157" />
          </g>
        </svg>
      </div>
    );
  }
}

export default WeatherForecast;
