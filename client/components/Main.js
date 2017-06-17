import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import axios from 'axios'


import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';

// Component //

const Main = props => {

  const { children } = props;

  const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];


axios.put('/api/range', {
  data: {
    date1: new Date ('09/01/2012'),
    date2: new Date ('10/01/2012')
  }
})
.then(res => res.data)
.then(array => console.log(array))


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
      <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`$${x / 1000}k`)}
          />
          <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
          />
      </VictoryChart>
      <hr />
      { children }
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
};

// Container //

const mapState = ({}) => ({});

const mapDispatch = dispatch => ({
});

export default connect(mapState, mapDispatch)(Main);
