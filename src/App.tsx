import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { router } from './routes';
import configureStore from './redux/store';
import './App.css';

const { store, persistor } = configureStore();

const App: FC = () => {
  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {router}
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
