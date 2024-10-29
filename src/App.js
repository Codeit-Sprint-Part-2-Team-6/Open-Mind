import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import FeedList from './pages/FeedList/FeedList';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/list' && (
        <button onClick={() => navigate('/list')}>Go to FeedList</button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Routes>
        <Route path='list' element={<FeedList />} />
      </Routes>
    </Router>
  );
}

export default App;
