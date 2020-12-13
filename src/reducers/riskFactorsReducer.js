const riskFactorsReducer = (state = [], action) => {
    if (action.type === 'ADD_RISK_FACTORS') {
      return action.payload;
    }
  
    return state;
  }
  
  export default riskFactorsReducer;