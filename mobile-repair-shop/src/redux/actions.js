// actions.js

export const addRepair = (repair) => ({
  type: 'ADD_REPAIR',
  payload: repair,
});

export const moveToOutlist = (id) => {
  console.log(`Action dispatched to move repair with ID ${id} to outlist`);  // Debugging action call
  return {
    type: 'MOVE_TO_OUTLIST',
    payload: id,
  };
};

export const deleteRepairs = (modelNumbers) => {
  console.log("iam in action of deleteRepairs ");
  console.log('Action for deleteRepairs called with:', modelNumbers);
  return {
    type: 'DELETE_REPAIRS',
    payload: modelNumbers, // Array of repair model numbers to delete
  };
};

export const updateRepair = (index, updatedRepair) => {
  return {
    type: 'UPDATE_REPAIR',
    payload: {
      index,
      updatedRepair,
    },
  };
};
