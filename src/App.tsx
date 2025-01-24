import { store } from './store';
import { Provider } from 'react-redux';

import RouterWrapper from './pages/RouterWrapper/RouterWrapper';

function App() {
  return (
    <Provider store={store}>
      <RouterWrapper />
    </Provider>
  );
}

export default App;
