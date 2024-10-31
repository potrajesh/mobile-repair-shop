const initialState = {
  repairs: [],
  outlist: [],
};

const repairReducer = (state = initialState, action) => {
  console.log("iam in reducer ");  // Log the action type
  console.log("Reducer action type:", action.type);  // Log the action type

  switch (action.type) {
    case 'ADD_REPAIR':
      return {
        ...state,
        repairs: [...state.repairs, action.payload],
      };
    case 'MOVE_TO_OUTLIST':
      const repairToMove = state.repairs.find((repair) => repair.id === action.payload);
      return {
        ...state,
        outlist: [...state.outlist, repairToMove],
      };
      case 'DELETE_REPAIRS':
        console.log("State before deletion:", state);
        console.log("iam in Inside reducer delete function with payload:", action.payload); // Log payload
        return {
          ...state,
          repairs: (state.repairs || []).filter(
            (repair) => !action.payload.includes(repair.modelNumber)
          ),
        };
    case 'UPDATE_REPAIR':
      const { index, updatedRepair } = action.payload;
      const updatedRepairs = [...state.repairs];
      updatedRepairs[index] = { ...updatedRepairs[index], ...updatedRepair };
      return {
        ...state,
        repairs: updatedRepairs,
      };
    default:
      return state;
  }
};

export default repairReducer;
