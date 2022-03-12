import '../styles/globals.css'
import {ThemeProvider} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        >
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
