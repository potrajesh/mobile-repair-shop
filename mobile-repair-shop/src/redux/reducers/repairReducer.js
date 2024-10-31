const initialState = [];

const repairReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REPAIR':
      return [...state, action.payload];
    case 'UPDATE_REPAIR':
      // logic for updating a repair
      return state;
    case 'DELETE_REPAIR':
      // logic for deleting a repair
      return state.filter(repair => repair.id !== action.payload);
    default:
      return state;
  }
};

export default repairReducer;
