import Request from 'superagent';

export const approve = (adminToken, results) => dispatch => {
    Request
        .post('http://quiz.griddynamics.com/api/gridquiz/admin/dashboard/approve')
        .send(results)
        .set('X-User-Token', adminToken)
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'APPROVE_RESULTS', payload: res.body});
            }
        });
};