const TaskReducer = ( state = [], action ) => {
    switch (action.type) {
        case "ADD":
            state = action.data;
            return state;
        case "UPDATE":
            state = action.data;
            return state;
        case "DELETE":
            state = action.data;
            return state;
        default:
            return state;
    }
};

export default TaskReducer;
