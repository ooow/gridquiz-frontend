import {StyleSheet} from 'aphrodite';
import {container} from "./elements/flexContainer";


export default StyleSheet.create(
    {
        homeHeadContainer: {
            ...container,
            height: '100vh'
        },

        space: {
            ...container,

            height: '20vh'
        },

        mainLogoContainer: {
            ...container,
            height: '60vh'
        },

        nextArrowContainer: {
            ...container,

            height: '20vh'
        },

        logo: {
            width: '100%',
            height: '60%'
        },

        companyTitle: {
            height: '10%',
            width: '100%',

            textAlign: 'center',

            fontSize: 'x-large',
            maxFontSize: '10px',

            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'normal',
            color: '#FFFFFF'
        },

        quizTitle: {
            height: '40%',
            width: '100%',

            textAlign: 'center',

            fontSize: '9em',

            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#B5ECD5'
        }
    }
)