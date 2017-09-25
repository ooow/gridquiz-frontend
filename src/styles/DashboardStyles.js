import {StyleSheet} from 'aphrodite';
import {container} from "./elements/flexContainer";


export default StyleSheet.create(
    {
        headContainer: {
            ...container,
            flexDirection: 'row',
            justifyContent: 'flex-start',

            minHeight: '20vh',
            minWidth: '100vw'
        },

        logoContainer: {
            ...container,

            minHeight: '20vh',
            minWidth: '100px',
            width: '10%'
        },

        quizTitleContainer: {
            ...container,

            minHeight: '20vh',
            width: '10%',

            fontSize: '3em',
            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#FFFFFF'
        },

        quizTitle: {
            width: '90%',
            minWidth: '100px',
            borderRight: '1px solid #FFFFFF',
        },

        space: {
            minHeight: '20vh',
            width: '20%'
        },

        quizName: {
            ...container,
            minHeight: '20vh',
            width: '60%',

            fontSize: '7em',
            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#FFFFFF'
        },

        bodyContainer: {
            ...container,
            minHeight: '80vh',
            minWidth: '100vw'
        }
    }
)