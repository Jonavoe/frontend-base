import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import client from './apollo/client';
import App from './App';
import 'antd/dist/reset.css';
import './theme.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>
);
