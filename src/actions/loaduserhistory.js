import Request from 'superagent';

export const loadUserHistory = (userToken) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/quizzes/history')
        .send()
        .set('X-User-Token', userToken)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'LOAD_USER_HISTORY', payload: res.body});
            }
        });
};