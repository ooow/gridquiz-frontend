import Request from 'superagent';

export const loadQuiz = (userStartQuiz) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/quiz/start')
        .send(userStartQuiz)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'LOAD_QUIZ', payload: res.body});
            }
        });
};