import Request from 'superagent';

export const authUser = (user) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/auth/user')
        .send(user)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'AUTHENTICATION_USER', payload: res.body});
                localStorage.setItem('user', JSON.stringify(res.body));
            }
        });
};