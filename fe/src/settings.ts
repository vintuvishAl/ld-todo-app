import { createMuiTheme } from '@material-ui/core/styles'

export const apiLink = 'http://127.0.0.1:8000'

export const theme = createMuiTheme({
    palette: {
        type:  'light',
        primary: {
            light: "#DED3FF",
            main: "#5F2EEA",
            dark: "#14142B",

        },
        secondary: {
            light: '#EFF0F6',
            main: "#A0A3BD",
            dark:  '#6E7191'
        },
        success: {
            main: "#00BA88"
        },
        error: {
            main: "#ED2E7E"
        }
    },
    props: {
        MuiInput: {
            disableUnderline: true
        },
        MuiButtonBase: {
            disableRipple: true, 
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
          ].join(','),
        h4: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '32px',
            lineHeight: '34px',
            letterSpacing: '1px',
            color: '#14142B'
        },
        h6: {
            fontWeight: 600,
            fontSize: '14px'
        }
    },
    shape: {
        borderRadius: 30
    },
    overrides: {
       
        MuiButton: {
            root: {
                padding: 8,
                paddingLeft: 32,
                paddingRight: 32,
                textTransform: 'capitalize',
                letterSpacing: '0.75px',
                fontWeight: 600
            }
        },
        MuiTab: {
            root: {
                textTransform: 'capitalize',
                '&$selected': {
                    color: '#14142B',
                    fontWeight: 600
                },
                marginLeft: 0,
                minWidth: '10px',
                padding: 0,
                fontWeight: 600,
             },   
        },
        MuiTabs: {
            indicator: {
                display: "flex",
                justifyContent: "center",
                backgroundColor: "transparent",
                height: '8px',
                '& > span': {
                    maxWidth: '8px',
                    borderRadius: '50%',
                    background: '#14142B',
                    width: '100%'
                },
                transitionDuration: '0 !important'
              
            }
        },
        MuiFormLabel: {
            root: {
                
                '&$focused': {
                    color: '#A0A3BD',
                }
            }
        },
        MuiCheckbox: {
            root: {
                borderRadius: '50%'
            }
        },
    }
})

     