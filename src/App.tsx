import { store } from './store';
import { Provider } from 'react-redux';

import AppWrapper from './pages/AppWrapper/AppWrapper';

function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
