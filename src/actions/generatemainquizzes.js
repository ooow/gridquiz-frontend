import Request from 'superagent';

export const generateMainQuizzes = (adminToken) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/admin/generate')
        .send()
        .set('X-User-Token', adminToken)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            {
                dispatch({type: 'GENERATE_MAIN_QUIZZES'});
            }
        });
};