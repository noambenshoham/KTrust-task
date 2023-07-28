import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/custom.scss';
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
)
