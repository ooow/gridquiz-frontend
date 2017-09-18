export default function result(state = [], action) {
    if (action.type === 'SEND_FOR_REVIEW') {
        return action.payload;
    }

    if (action.type === 'CLEAN_RESULT_STORY') {
        return action.payload;
    }

    return state;
}