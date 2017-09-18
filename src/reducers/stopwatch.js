const initState = {
    start: 0,
    end: 0,
    run: false
};

export default function stopwatch(state = initState, action) {
    if (action.type === 'START_WATCH') {
        state.start = action.payload;
        state.run = true;
    }

    if (action.type === 'STOP_WATCH') {
        state.end = action.payload;
        state.run = false;
    }
    return state;
}