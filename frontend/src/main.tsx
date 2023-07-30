import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/custom.scss';
import { RecoilRoot } from 'recoil'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from './components/LoginPage'


const router = createBrowserRouter([
    {
        path: "*",
        element: <App />,
        children: [
            {
                path: "login/",
                element: <LoginPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
        <RouterProvider router={router} />
    </RecoilRoot>
)
