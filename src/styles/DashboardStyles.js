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
        },


        // SLIDES

        slideContainer: {
            ...container,
            minHeight: '80vh',
            minWidth: '80vw'
        },

        slideTitleContainer: {
            ...container,
            minHeight: '12vh',
            minWidth: '80vw'
        },

        slideTitle: {
            fontSize: '4em',
            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#B5ECD5'
        },

        slideBodyContainer: {
            ...container,
            justifyContent: 'space-around',

            minHeight: '60vh',
            minWidth: '80vw'
        },

        slideSpaceContainer: {
            ...container,
            flexDirection: 'row',

            fontSize: '2em',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '400',
            color: '#4A4A4A',

            minHeight: '9vh',
            minWidth: '60vw',

            borderRadius: '8px',
            boxShadow: '0 16px 32px 0 rgba(0,0,0,0.24)'
        },

        place: {
            ...container,
            minHeight: '9vh',
            width: '10%',

            borderRight: '1px solid #4A4A4A',
            borderRadius: '8px 0 0 8px',
            boxShadow: '0 16px 32px 0 rgba(0,0,0,0.54)'
        },

        name: {
            ...container,
            minHeight: '9vh',
            width: '60%',
            fontWeight: '700'
        },

        points: {
            ...container,
            minHeight: '9vh',
            width: '15%'
        },

        time: {
            ...container,
            minHeight: '9vh',
            width: '15%'
        }
    }
)