export const addRepair = (repair) => {
    return {
      type: 'ADD_REPAIR',
      payload: repair,
    };
  };
  
  export const updateRepair = (id, updatedRepair) => {
    return {
      type: 'UPDATE_REPAIR',
      payload: { id, updatedRepair },
    };
  };
  
  export const deleteRepair = (id) => {
    return {
      type: 'DELETE_REPAIR',
      payload: id,
    };
  };
  