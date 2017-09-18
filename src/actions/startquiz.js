import Request from 'superagent';

export const startQuiz = (timestamp) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/quiz/startquiz')
        .send(timestamp)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'START_QUIZ', payload: res.body});
            }
        });
};