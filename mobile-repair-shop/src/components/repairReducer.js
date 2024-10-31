// repairReducer.js

const initialState = {
  repairs: [], // Array of all repairs
  outlist: [], // Array of repairs moved to outlist
};

const repairReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REPAIR':
      return {
        ...state,
        repairs: [...state.repairs, action.payload], // Add a new repair to the repairs list
      };

    case 'MOVE_TO_OUTLIST':
      const repairToMove = state.repairs.find((repair) => repair.id === action.payload);
      if (repairToMove) {
        return {
          ...state,
          repairs: state.repairs.filter((repair) => repair.id !== action.payload), // Remove repair from main list
          outlist: [...state.outlist, repairToMove], // Add selected repair to outlist
        };
      }
      return state;

    case 'DELETE_REPAIRS':
      return {
        ...state,
        repairs: state.repairs.filter((repair) => !action.payload.includes(repair.modelNumber)), // Remove selected repairs
      };

    case 'UPDATE_REPAIR':
      const { index, updatedRepair } = action.payload;
      const updatedRepairs = [...state.repairs];
      updatedRepairs[index] = { ...updatedRepairs[index], ...updatedRepair }; // Update repair at a specific index
      return {
        ...state,
        repairs: updatedRepairs,
      };

    default:
      return state;
  }
};

export default repairReducer;
