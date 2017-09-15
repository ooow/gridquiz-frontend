import Request from 'superagent';

export const sendForReview = (results) => dispatch => {
    console.log(JSON.stringify(results));
    Request
        .post('http://localhost:8080/api/gridquiz/quiz/result')
        .send(results)
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