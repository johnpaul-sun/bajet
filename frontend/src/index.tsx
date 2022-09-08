import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Router from './routes';
import './index.css';
import './assets/styles/tailwind.output.css';
import { ContextProvider } from './context/MainContext';
import { Provider } from 'react-redux';
import { Store } from "src/redux/Store";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={Store}>
        <Router />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
