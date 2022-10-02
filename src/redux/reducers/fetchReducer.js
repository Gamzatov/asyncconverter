import {GET_DATA} from "../actions/fetchData";

const initialState = {
    data: [],
};

export const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state,
                data: [action.payload]
            }
        }
        default:
            return state
    }
}