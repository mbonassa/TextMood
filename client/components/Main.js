import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';

import {VictoryBar, VictoryChart, VictoryAxis} from 'victory';

// Component //

class Main extends React.Component {

  constructor (props) {
    super (props)
  }



  render (props) {
  return (
    <div>
      <p>Hello World</p>
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
              data={this.props.dataArray}
              x="quarter"
              y="earnings"
            />
        </VictoryChart>
    </div>
  )
  }
}

// Container

function mapState(state) {
  return {
    dataArray: state.dataArray
  }
}

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Main);


    // <div>
    //     <VictoryChart
    //         // domainPadding will add space to each side of VictoryBar to
    //         // prevent it from overlapping the axis
    //         domainPadding={20}
    //       >
    //         <VictoryAxis
    //           // tickValues specifies both the number of ticks and where
    //           // they are placed on the axis
    //           tickValues={[1, 2, 3, 4]}
    //           tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
    //         />
    //         <VictoryAxis
    //           dependentAxis
    //           // tickFormat specifies how ticks should be displayed
    //           tickFormat={(x) => (`$${x / 1000}k`)}
    //         />
    //         <VictoryBar
    //           data={this.props.state.dataArray}
    //           x="quarter"
    //           y="earnings"
    //         />
    //     </VictoryChart>
    // </div>