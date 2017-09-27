import Request from 'superagent';

export const loadDashboard = () => dispatch => {
    Request
        .get('http://quiz.griddynamics.com/api/gridquiz/dashboard')
        .send()
        .set('accept', 'application/json')
        .set('verbose', true)
        .end((err, res) => {
            if (err) {
                console.log("err", err);
            } else {
                dispatch({type: 'LOAD_DASHBOARD', payload: res.body});
            }
        });
};