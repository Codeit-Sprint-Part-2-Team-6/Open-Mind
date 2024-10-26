import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedDetailPage from './pages/FeedDetail/FeedDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/post' element={<FeedDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
