import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { persistor, store } from './app/Store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import "./reset.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
