export default function user(state = false, action) {
    if (action.type === 'AUTHENTICATION_USER') {
        return action.payload;
    }
    return state;
}