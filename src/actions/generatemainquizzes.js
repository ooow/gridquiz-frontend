import Request from 'superagent';

export const generateMainQuizzes = (user) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/admin/generate')
        .send(user)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'GENERATE_MAIN_QUIZZES: ' + res.body});
            }
        });
};