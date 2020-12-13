const symptomsReducer = (state = [], action) => {
    if (action.type === 'ADD_SYMPTOMS') {
        return action.payload
    }
  
    return state;
  }
  
  export default symptomsReducer;