export default function user(state = [], action) {
    if (action.type === 'AUTHENTICATION_USER') {
        return action.payload;
    }
    return state;
}