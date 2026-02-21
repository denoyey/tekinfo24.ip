import AppRoutes from './routes/AppRoutes.jsx';
import useSmoothScroll from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll({ lerp: 0.07, duration: 1.4, wheelMultiplier: 0.7 });

  return <AppRoutes />;
}

export default App;
