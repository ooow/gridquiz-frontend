import {StyleSheet} from 'aphrodite';
import {container} from './elements/flexContainer';
import {modalwindow} from "./elements/modalwindow";
import {modalbackdrop} from "./elements/modalbackdrop";
import {modalplace} from "./elements/modalplace";

export default StyleSheet.create(
    {
        quizContainer: {
            ...container,
            minHeight: '100vh',
            minWidth: '100vw'
        },

        // HEAD

        head: {
            ...container,
            flexDirection: 'row',
            alignItems: 'flex-start',
            minHeight: '20vh',
            minWidth: '100vw'
        },

        logoContainer: {
            ...container,

            minHeight: '20vh',
            minWidth: '100px',
            width: '10%'
        },

        logo: {
            height: '90%',
            width: '90%'
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

        quizName: {
            ...container,
            minHeight: '20vh',
            width: '60%',

            fontSize: '7em',
            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#FFFFFF'
        },

        space: {
            minHeight: '20vh',
            width: '20%'
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
            justifyContent: 'space-around',
            minHeight: '80vh',
            minWidth: '100vw'
        },

        questionContainer: {
            ...container,
            flexDirection: 'row',
            minHeight: '30vh',
            width: '85vw',
            minWidth: '640px'
        },

        valueContainer: {
            ...container,
            width: '30vh',
            height: '12.5vw',
            minHeight: '100px',
            minWidth: '100px',

            maxWidth: '150px'
        },

        value: {
            ...container,
            width: '100%',
            height: '80%',

            fontSize: 'xx-large',
            fontFamily: 'Open Sans, sans-serif',

            borderRadius: '8px 8px 0 0',
            boxShadow: '0 0 20px rgba(0, 0, 0, .3)',
            borderBottom: '1px solid #CCCCCC',

            background: '#F8F8F8'
        },

        valueText: {
            ...container,
            justifyContent: 'space-around',
            width: '100%',
            height: '20%',


            fontSize: 'small',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'lighter',
            color: '#000000',

            boxShadow: '0 10px 20px rgba(0, 0, 0, .3)',
            borderRadius: '0 0 8px 8px',

            background: '#F8F8F8'
        },

        questionTitle: {
            ...container,
            height: '30vh',
            width: '60vw',

            minHeight: '160px',
            minWidth: '520px',

            paddingLeft: '10px',
            paddingRight: '10px',

            textAlign: 'center',
            fontSize: 'xx-large',
            fontFamily: 'Roboto, sans-serif',
            color: '#FFFFFF'
        },

        answersContainer: {
            ...container,
            flexDirection: 'row',
            minHeight: '50vh',
            width: '85vw',
            minWidth: '640px',
            flexWrap: 'wrap'
        },

        answer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            textAlign: 'center',
            fontSize: '1.5em',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '400',
            color: '#000000',

            marginLeft: '20px',
            marginRight: '20px',
            marginTop: '10px',
            marginBottom: '10px',

            paddingLeft: '5px',
            paddingRight: '5px',

            height: '12vh',
            width: '450px',
            minHeight: '100px',
            minWidth: '450px',

            borderRadius: '8px',
            backgroundColor: '#DEDEDE',
            boxShadow: '0 3px 4px 0 rgba(0,0,0,0.3)',

            ':hover': {
                backgroundColor: '#FFFFFF'
            }
        },


        // INPUT STYLE

        questionInputContainer: {
            ...container,
            justifyContent: 'space-around',
            width: '100%',
        },

        questionInputTitle: {
            height: '30%',
            width: '60%',

            minHeight: '100px',
            minWidth: '520px',

            paddingLeft: '10px',
            paddingRight: '10px',

            textAlign: 'center',
            fontSize: 'xx-large',
            fontFamily: 'Roboto, sans-serif',
            color: '#FFFFFF'
        },

        questionInputText: {
            height: '40%',
            width: '90%',

            minHeight: '100px',
            minWidth: '520px',

            paddingLeft: '10px',
            paddingRight: '10px',

            textAlign: 'center',
            fontSize: 'x-large',
            fontFamily: 'Roboto, sans-serif',
            color: '#FFFFFF'
        },

        answerInputContainer: {
            ...container,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            height: '20vh',
            width: '80%'
        },

        inputContainer: {
            ...container,
            height: '20vh',
            width: '80%',
            minWidth: '520px',

            borderRadius: '8px 0 0 8px',
            background: '#DEDEDE'
        },

        inputText: {
            height: '20%',
            width: '90%',

            fontFamily: 'Roboto, sans-serif',
            fontSize: 'large',
            color: '#666666',

            opacity: '0.6'
        },

        answerInput: {
            height: '60%',
            width: '90%',

            fontFamily: 'Roboto, sans-serif',
            fontSize: '300%',
            color: '#4A4A4A',

            border: 'none',
            background: '#DEDEDE',

            ':focus:': {
                outline: 'none'
            }
        },

        inputLineContainer: {
            ...container,
            height: '20%',
            width: '90%'
        },

        inputLine: {
            width: '100%',

            border: 'none',
            backgroundColor: '#666666',
            color: '#666666',
            height: '1px'
        },

        answerButton: {
            ...container,
            height: '100%',
            width: '20%',

            fontSize: 'xx-large',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            color: '#9B9B9B',

            borderRadius: '0 8px 8px 0',
            background: '#CCCCCC',

            ':hover': {
                backgroundColor: '#FFFFFF'
            }
        },


        // CODE STYLE

        questionContainerCode: {
            ...container,
            flexDirection: 'row',
            width: '85vw',
            minWidth: '640px'
        },

        codeContainer: {
            ...container,
            minWidth: '100vw',
            justifyContent: 'flex-start',
            marginTop: '15px'
        },

        codeQuestionText: {
            maxWidth: '80vw',

            fontSize: 'x-large',

            opacity: '0.85',
            borderRadius: '8px'
        },

        codeQuestionTitle: {
            ...container,
            height: '20%',
            width: '90%',

            paddingLeft: '10px',
            paddingRight: '10px',

            textAlign: 'center',
            fontSize: 'x-large',
            fontFamily: 'Roboto, sans-serif',
            color: '#FFFFFF'
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