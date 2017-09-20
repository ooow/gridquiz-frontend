import Request from 'superagent';

export const getUsers = () => dispatch => {
    Request
        .get('http://localhost:8080/api/gridquiz/users')
        .send()
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