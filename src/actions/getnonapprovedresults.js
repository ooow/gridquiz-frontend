import Request from 'superagent';

export const getNonApprovedUserResults = (adminToken) => dispatch => {
    Request
        .post('http://localhost:8080/api/gridquiz/admin/non/approved')
        .send()
        .set('X-User-Token', adminToken)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'LOAD_NON_APPROVED_USER_RESULTS', payload: res.body});
            }
        });
};