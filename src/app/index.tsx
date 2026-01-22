import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  return (
    <AppProvider>
      <div
        className="min-h-screen w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url("gray-abstract-wireframe-technology-background.jpg")' }}
      >
        <AppRouter />
      </div>
    </AppProvider>
  );
};