import { actionTypes } from 'react-redux-form';

export const Partners = (state = {
        isLoading: true,
        errMess: null,
        partners: []
}, action) => {
    switch (action.type) {
        case actionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};
        case actionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []};
        case actionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        default:
            return state;
    }
}
