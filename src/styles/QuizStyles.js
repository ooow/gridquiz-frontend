import {StyleSheet} from 'aphrodite';
import {container} from './elements/flexContainer';

export default StyleSheet.create(
    {
        container: {
            ...container
        },

        // HEAD

        head: {
            ...container,
            flexDirection: 'row',
            height: '20%'
        },

        logoContainer: {
            ...container,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',

            height: '80%',
            width: '10%',
        },

        logo: {
            width: '90%'
        },

        quizTitle: {
            ...container,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',

            height: '50%',
            width: '5%',

            fontSize: '3vw',
            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#B5ECD5'
        },

        lineContainer: {
            ...container,
            flexDirection: 'row',
            alignItems: 'flex-start',

            height: '80%',
            width: '20%'
        },

        line: {
            height: '50%',
            width: '6%',
            minWidth: '18px',

            paddingLeft: '10px',

            ontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: 'white',

            borderLeft: '1px solid white'
        },

        quizAuthor: {
            width: '84%',

            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: 'white'
        },

        quizName: {
            ...container,
            width: '35%',

            fontSize: '5vw',
            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#B5ECD5'
        },

        stopwatchContainer: {
            ...container,
            width: '30%',
        },

        stopwatch: {
            ...container,
            height: '35%',
            width: '25%',

            minWidth: '120px',
            minHeight: '100px',

            fontSize: 'xx-large',
            fontFamily: 'Open Sans, sans-serif',

            borderRadius: '8px 8px 0 0',
            boxShadow: '0 0 20px rgba(0, 0, 0, .3)',

            opacity: '.60',

            background: 'white'
        },

        stopwatchText: {
            ...container,
            justifyContent: 'space-around',
            height: '15%',
            width: '25%',

            minWidth: '120px',

            fontSize: 'large',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: 'black',

            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',

            opacity: '.75',
            background: 'white'
        },

        // BODY

        bodyContainer: {
            ...container,
            height: '80%'
        },

        question: {
            ...container,
            justifyContent: 'flex-start',
            height: '50%',

            marginTop: '15px'
        },

        counter: {
            ...container,
            width: '80px',
            height: '60px',

            fontSize: 'large',
            fontFamily: 'Open Sans, sans-serif',

            borderRadius: '8px 8px 0 0',
            boxShadow: '0 0 20px rgba(0, 0, 0, .3)',

            opacity: '.60',

            background: 'white'
        },

        counterText: {
            ...container,
            justifyContent: 'space-around',
            width: '80px',
            height: '20px',

            fontSize: 'small',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: 'black',

            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',

            opacity: '.75',
            background: 'white'
        },

        questionText: {
            fontFamily: 'Roboto, sans-serif'
        },

        answersContainer: {
            ...container,
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '80%'
        },

        answer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            fontSize: '300%',

            margin: '20px',

            height: '30%',
            width: '40%',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 16px 32px 0 rgba(0, 0, 0, 0.54)',
        }
    }
)