export default function result(state = [], action) {
    if (action.type === 'SEND_FOR_REVIEW') {
        return action.payload;
    }

    return state;
}