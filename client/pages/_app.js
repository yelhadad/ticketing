<<<<<<< HEAD
/* the purpuse of this file is to enable bootstap on next js
project, I don't realy understant how this is working but let's 
give it a try! */
//
import 'bootstrap/dist/css/bootstrap.css';

export default ({ Component, pageProps }) => {
=======
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp({ Component, pageProps }) {
>>>>>>> 8eaf65a0aa8c493b62711eae16c1687aec27304a
  return <Component {...pageProps} />
}