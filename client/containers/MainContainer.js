import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchData, showChart } from '../reducer/initial';
import Main from '../components/Main';
import store from '../store/index';
import axios from 'axios';

// Component //

class MainContainer extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
    }
    this.fetchingData = this.props.fetchingData.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }

  componentDidMount () {
    this.fetchingData({date1: '01/01/2013', date2: '02/01/2013'})
  }


  render (props) {
  return (
    <div>
      <h1>TextMood</h1>
      <h3>TextMood is a life enhancing tool that caters to your neurotic impulses</h3>
        <ul>
          <li>How has your relationship with beau <b>evolved</b> or <b>devolved</b> over time?</li>
          <li>Is April the cruelest month? See how your mood changes <b>with the seasons</b></li>
          <li>Do rainy days and Mondays always <b>get you down</b>? We’ll show you the receipts!</li>
          <li>Is the friend-ship worth keeping or is it sinking and bringing you down with it? <b>Get'em overboard!</b></li>
          <li>How did national tragedies <b>affect YOU</b>? And how to protect yourself against negative feelings when they strike again</li>
          <li>Find out when you should devote a little more to your <b>self-care routine</b></li>
        </ul>
        <button onClick={this.handleClick}>Show chart</button>
        {this.props.chart ? <Main /> : null}
      <hr />
    </div>
  )
  }
}

// Container //

const mapState = (state) => state

const mapDispatch = dispatch => ({
  fetchingData: dateObject => {
    return dispatch(fetchData(dateObject))
  },
  handleClick: () => {
    return dispatch(showChart())
  }
});

export default connect(mapState, mapDispatch)(MainContainer);

        // {this.props.dataArray ? <Main /> : null}