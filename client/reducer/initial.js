import axios from 'axios';
import { Map } from 'immutable';

//------- ACTIONS -------
const GET_DATA = 'GET_DATA';
const SHOW_CHART = 'SHOW_CHART'

// ------ ACTION CREATORS -------
const init = data => ({
    type: GET_DATA,
    data
});
const showingChart = () => ({
    type: SHOW_CHART
})

// ------- INIT STATE -----------
const initialState = {
    dataArray: [],
    chart: true
}

// ------- REDUCERS ------------
export default function reducer (state = initialState, action) {

    const newState = Object.assign({}, state);
    newState.dataArray = newState.dataArray.slice();

    switch (action.type) {

    case GET_DATA:
        newState.dataArray = action.data;
        break;

    case SHOW_CHART:
        newState.chart = true;
        break;

    default:
        return state;
    }
    return newState;

}

// -------- DISPATCHERS -----------
export const fetchData = dateObject => dispatch => {
    axios.put('/api/range', {data: dateObject})
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching data unsuccessful', err));
};

export const showChart = () => dispatch => {
    dispatch(showingChart())
}
