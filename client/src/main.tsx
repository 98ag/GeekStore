import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './app/Store.ts'
import { Provider } from 'react-redux'
import "./reset.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
