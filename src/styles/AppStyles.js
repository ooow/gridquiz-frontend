import {StyleSheet} from 'aphrodite';
import {container} from './elements/flexContainer';
import {modalbackdrop} from './elements/modalbackdrop';
import {modalwindow} from './elements/modalwindow';
import {modalplace} from './elements/modalplace';

export default StyleSheet.create(
    {
        container: {
            ...container,
            minHeight: '80vh',
            minWidth: '100vw',
            zIndex: '0'
        },

        unlockContainer: {
            ...container,
            minHeight: '7vh',
            minWidth: '100vw',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',

            position: 'fixed',
            height: '5%'
        },

        unlock: {
            marginTop: '20px',
            marginRight: '20px',
            height: '90%'
        },

        quizzes: {
            ...container,
            minHeight: '80vh',
            minWidth: '80vw',

            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap'
        },

        quiz: {
            ...container,
            alignItems: 'stretch',

            margin: '15px',

            height: '300px',
            width: '400px',

            minWidth: '30%',
            minHeight: '30%',
        },

        quizName: {
            textAlign: 'center',
            fontFamily: 'WanderlustLetters, sans-serif',
            fontSize: '5em',
            color: '#FFFFFF',

            minHeight: '75%',

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
            ...modalplace
        },

        modalPlaceTitle: {
            width: '80%',
            height: '20%',

            textAlign: 'center',
            fontFamily: 'WanderlustLetters, sans-serif',
            fontSize: '5em',
            color: '#4A4A4A'
        },

        modalPlaceComment: {
            width: '80%',
            height: '15%',
            minHeight: '80px',

            fontFamily: 'Open Sans, sans-serif',
            fontSize: '1.5em',
            textAlign: 'center',
            color: '#000000',
            opacity: '0.67'
        },

        modalPlaceInput: {
            width: '90%',
            height: '15%',
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '3em',
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
            height: '20%',
            minHeight: '70px'
        },

        modalPlaceButton: {
            width: '60px',
            minHeight: '60px'
        }
    }
)