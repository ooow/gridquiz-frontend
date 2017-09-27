import Request from 'superagent';

export const startQuiz = (quizId, userToken) => dispatch => {
    Request
        .post('http://quiz.griddynamics.com/api/gridquiz/quiz/start')
        .send(quizId)
        .set('X-User-Token', userToken)
        .set('accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'LOAD_QUIZ', payload: res.body});
            }
        });
};