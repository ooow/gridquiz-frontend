import {StyleSheet} from 'aphrodite';
import {container} from './elements/flexContainer';
import {modalwindow} from "./elements/modalwindow";
import {modalbackdrop} from "./elements/modalbackdrop";
import {modalplace} from "./elements/modalplace";

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
            width: '10%'
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
            color: '#FFFFFF',

            borderLeft: '1px solid #FFFFFF'
        },

        quizAuthor: {
            width: '84%',

            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: '#FFFFFF'
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
            width: '30%'
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

            background: '#FFFFFF'
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
            color: '#000000',

            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',

            opacity: '.75',
            background: '#FFFFFF'
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

            background: '#FFFFFF'
        },

        counterText: {
            ...container,
            justifyContent: 'space-around',
            width: '80px',
            height: '20px',

            fontSize: 'small',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: '#000000',

            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',

            opacity: '.75',
            background: '#FFFFFF'
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
            backgroundColor: '#FFFFFF',
            boxShadow: '0 16px 32px 0 rgba(0, 0, 0, 0.54)'
        },

        // RESULT

        resultForm: {
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

            opacity: '0.70'
        },

        resultContainer: {
            ...container,
            justifyContent: 'flex-start',
            height: '40%',
            width: '40%'
        },

        result: {
            ...container,
            height: '35%',
            width: '50%',

            color: '#FFD3D3',

            minWidth: '120px',
            minHeight: '100px',

            fontSize: '350%',
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: '600',

            borderRadius: '8px 8px 0 0',
            boxShadow: '0 0 20px rgba(0, 0, 0, .3)',

            background: 'linear-gradient(180deg, #EA3440 0%, #DA3A4C 100%)'
        },

        resultText: {
            ...container,
            justifyContent: 'space-around',
            height: '15%',
            width: '50%',

            minWidth: '120px',

            fontSize: 'normal',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: '#FFFFFF',

            border: '1px solid #F55A65',
            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',

            background: 'linear-gradient(180deg, #EA3440 0%, #DA3A4C 100%)'
        },

        resultButton: {
            fontSize: 'x-large',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            color: '#2DCCAB'
        }
    }
)