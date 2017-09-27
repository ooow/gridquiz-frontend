import Request from 'superagent';

export const getUsers = (adminToken) => dispatch => {
    Request
        .post('http://quiz.griddynamics.com/api/gridquiz/admin/users')
        .send()
        .set('X-User-Token', adminToken)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'LOAD_USERS', payload: res.body});
            }
        });
};