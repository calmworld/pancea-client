import { combineReducers } from 'redux';
import symptomsReducer from './symptomsReducer';
import riskFactorsReducer from './riskFactorsReducer';

export default combineReducers({
	symptomsReducer,
	riskFactorsReducer
});