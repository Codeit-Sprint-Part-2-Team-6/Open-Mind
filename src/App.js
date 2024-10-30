import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { Helmet } from 'react-helmet';
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
    <>
      <Helmet>
        <link href='https://fonts.googleapis.com/css2?family=Actor&display=swap' rel='stylesheet' />
      </Helmet>
      <Router>
        <Routes>
          <Route path='list' element={<FeedList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
