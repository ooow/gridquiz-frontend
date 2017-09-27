import Request from 'superagent';

export const removeUsers = (adminToken, usersIds) => dispatch => {
    Request
        .post('http://quiz.griddynamics.com/api/gridquiz/admin/users/remove')
        .send(usersIds)
        .set('X-User-Token', adminToken)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'REMOVE_USERS', payload: res.body});
            }
        });
};