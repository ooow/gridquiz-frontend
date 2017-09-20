import Request from 'superagent';

export const removeUsers = (usersIds) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/users/remove')
        .send(usersIds)
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