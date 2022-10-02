import axios from "axios";
import async from "async";

export const GET_DATA = 'GET_DATA';


export const fetchData = () => {
    return function  async(dispatch) {
         fetch('https://cdn.cur.su/api/latest.json')
            .then((res) => res.json()
            .then(json => dispatch(getData(json.rates)))
            .then(json => console.log(json)))
    }
}
export const getData = (payload) => {
    return {
        type: GET_DATA,
        payload
    }
};