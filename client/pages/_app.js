/* the purpuse of this file is to enable bootstap on next js
project, I don't realy understant how this is working but let's 
give it a try! */
//
import 'bootstrap/dist/css/bootstrap.css';

export default ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}