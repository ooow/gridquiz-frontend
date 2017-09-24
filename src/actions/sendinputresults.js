import Request from 'superagent';

export const sendForReviewInputs = (results, userToken) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/quiz/inputresult')
        .send(results)
        .set('X-User-Token', userToken)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'SEND_FOR_REVIEW', payload: res.body});
            }
        });
};