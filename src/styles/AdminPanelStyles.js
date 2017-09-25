import {StyleSheet} from 'aphrodite';
import {container} from './elements/flexContainer';

export default StyleSheet.create(
    {
        adminHeadContainer: {
            ...container,
            flexDirection: 'row',
            alignItems: 'flex-start',
            minHeight: '20vh',
            minWidth: '100vw',

            background: 'linear-gradient(180deg, #82D4E3 0%, #58B1C6 100%)'
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

        headTitle: {
            ...container,
            minHeight: '20vh',
            width: '90%',

            fontSize: '7em',
            fontFamily: 'WanderlustLetters, sans-serif',
            color: '#FFFFFF'
        },

        menuContainer: {
            ...container,
            flexDirection: 'row',
            minHeight: '10vh',
            minWidth: '100vw'
        },

        adminButton: {
            ...container,

            margin: '10px',

            height: '50px',
            width: '150px',

            fontSize: 'small',
            color: '#FFFFFF',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '500',

            borderRadius: '8px',
            backgroundColor: '#F5D69C',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.12)',

            ':hover': {
                backgroundColor: '#FFFFFF',
                color: '#F5D69C'
            },
            ':active': {
                backgroundColor: '#FFFFFF',
                color: '#E6515E'
            }
        },

        adminLabel: {
            color: '#FFFFFF',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '500',
        }
    }
)