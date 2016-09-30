import React, { Component } from 'react';
import moment from 'moment';

import styles from './index.css';

class DateTime extends Component {

  static propTypes = {
    className: React.PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  constructor() {
    super();
    this.setTime = this.setTime.bind(this);
    this.state = {
      momentTime: moment(),
      isHalfTick: false,
    };
  }

  setTime() {
    this.setState({
      momentTime: moment(),
      isHalfTick: !this.state.isHalfTick,
    });
  }

  componentDidMount() {
    setInterval(this.setTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setTime);
  }

  render() {
    const { momentTime, isHalfTick } = this.state;
    let seperatorClassNames = [styles.seperator];

    if (isHalfTick) seperatorClassNames.push(styles.hide);

    return (
      <div className={[styles.DateTime, this.props.className].join(' ')}>
        <div className={styles.date}>
          {momentTime.format('dddd, MMMM Do')}
        </div>
        <div className={styles.time}>
          {momentTime.format('h')}
          <span className={seperatorClassNames.join(' ')}>
            :
          </span>
          {momentTime.format('mm')}
          <span className={styles.period}>
            {momentTime.format('A')}
          </span>
        </div>
      </div>
    );
  }
}

export default DateTime;
