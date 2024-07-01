
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-notifications-component/dist/theme.css'
import MainOut from './Components/LayoutArea/MainOut/MainOut.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './Redux/store.ts'
import { Provider } from 'react-redux'
import interceptorsService from './Service/interceptorService.ts'
import { ReactNotifications } from 'react-notifications-component';

interceptorsService.createInterceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <Provider store={store}>
    <BrowserRouter>
    <ReactNotifications />
        <MainOut />
    </BrowserRouter>
  </Provider>
)
