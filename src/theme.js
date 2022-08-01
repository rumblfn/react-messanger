import {
    extendTheme
} from "@chakra-ui/react";

const theme = {
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: true,
    },
    styles: {
        global: (props) => ({
            body: {
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                transition: 'all 0.22s',
                fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                  sans-serif`,
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                backgroundColor: props.colorMode === 'dark' ? 'var(--main-app-dark-bg-color)' : 'var(--main-app-light-bg-color)',
            },

            code: {
                fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
            }
        })
    }
}

export default extendTheme(theme)