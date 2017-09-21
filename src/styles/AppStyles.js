import {StyleSheet} from 'aphrodite';
import {container} from './elements/flexContainer';
import {modalbackdrop} from './elements/modalbackdrop';
import {modalwindow} from './elements/modalwindow';
import {modalplace} from './elements/modalplace';

export default StyleSheet.create(
    {
        container: {
            ...container,
            height: '80%',
            zIndex: '0',

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
            color: '#FFFFFF',

            height: '75%',

            borderRadius: '8px 8px 0 0',
            boxShadow: '0 0 20px rgba(0, 0, 0, .3)'
        },

        description: {
            ...container,
            justifyContent: 'space-around',

            height: '25%',

            fontFamily: 'Roboto, sans-serif',
            color: '#000000',

            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',
            background: '#FFFFFF'
        },

        descriptionText: {
            fontSize: 'x-large',
            color: '#4D4845'
        },

        questionText: {
            fontWeight: 'bold',
            fontSize: 'large',
            color: '#9B9B9B',

            opacity: '0.75'
        },

        questionScore: {
            fontWeight: 'bold',
            fontSize: 'large',
            color: '#2DCCAB',

            opacity: '0.75'
        },

        registrationForm: {
            ...modalwindow
        },

        backdrop: {
            ...modalbackdrop
        },

        modalPlace: {
            ...modalplace,
            minWidth: '500px',
            minHeight: '500px'
        },

        modalPlaceTitle: {
            fontFamily: 'WanderlustLetters, sans-serif',
            fontSize: '5vw',
            color: '#4A4A4A'
        },

        modalPlaceComment: {
            width: '80%',

            fontFamily: 'Open Sans, sans-serif',
            fontSize: 'large',
            textAlign: 'center',
            color: '#000000',
            opacity: '0.67'
        },

        modalPlaceInput: {
            width: '90%',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 'xx-large',
            color: '#000000',
            opacity: '0.67',

            border: 'none',
            borderBottom: '2px solid rgba(0, 0, 0, 0.12)'
        },

        buttonsContainer: {
            ...container,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'flex-end',
            width: '40%',
            height: '70px'
        },

        modalPlaceButton: {
            width: '60px',
            height: '60px'
        }
    }
)