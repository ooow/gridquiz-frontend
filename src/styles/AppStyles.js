import {StyleSheet} from 'aphrodite';
import {container} from './elements/flexContainer';

export default StyleSheet.create(
    {
        container: {
            ...container,
            height: '80%',

            minHeight: '512px',
            minWidth: '320px'
        },

        quizzes: {
            ...container,
            width: '80%',

            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap'
        },

        quiz: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',

            margin: '15px',

            width: '30%',
            height: '30%',

            minWidth: '300px',
            minHeight: '300px'
        },

        quizName: {
            textAlign: 'center',
            fontFamily: 'WanderlustLetters, sans-serif',
            fontSize: '500%',
            color: 'white',

            height: '75%',

            borderRadius: '8px 8px 0 0',
            boxShadow: '0 0 20px rgba(0, 0, 0, .3)'
        },

        description: {
            ...container,
            justifyContent: 'space-around',

            height: '25%',

            fontFamily: 'Roboto, sans-serif',
            color: 'black',

            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',
            background: 'white'
        },

        descriptionText: {
            fontSize: 'x-large',
            color: '#4D4845'
        },

        questionText: {
            fontWeight: 'bold',
            fontSize: 'large',
            color: '#9B9B9B',

            opacity: '.75'
        }
    }
)