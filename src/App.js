import { React } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { AppRouter } from './Router/AppRouter'
import { store } from './Redux/store';
function App() {
  return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
  );
}

export default App;
