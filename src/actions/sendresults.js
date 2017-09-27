import Request from 'superagent';

export const sendForReview = (results, userToken) => dispatch => {
    Request
        .post('http://quiz.griddynamics.com/api/gridquiz/quiz/result')
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