export default function user(state = false, action) {
    if (action.type === 'AUTHENTICATION_USER') {
        return action.payload;
    }

    if (action.type === 'LOGOUT_USER') {
        return null;
    }

    return state;
}