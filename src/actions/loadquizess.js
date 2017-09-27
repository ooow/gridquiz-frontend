import Request from 'superagent';

export const loadQuizzes = () => dispatch => {
    Request
        .post('http://quiz.griddynamics.com/api/gridquiz/quizzes')
        .send()
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'LOAD_QUIZZES', payload: res.body});
            }
        });
};