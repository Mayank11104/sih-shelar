import { AppProvider } from '../store/AppContext';
import { NotificationProvider } from '../store/NotificationContext';
import AppRouter from './Router';

export default function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </AppProvider>
  );
}
