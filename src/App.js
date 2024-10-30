import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { Helmet } from 'react-helmet';
<<<<<<<<< Temporary merge branch 1
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
=========
import FeedDetailPage from './pages/FeedDetail/FeedDetailPage';
>>>>>>>>> Temporary merge branch 2

function App() {
  return (
    <>
      <Helmet>
        <link href='https://fonts.googleapis.com/css2?family=Actor&display=swap' rel='stylesheet' />
      </Helmet>
    
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes>
<<<<<<<<< Temporary merge branch 1
            <Route path='list' element={<FeedList />} />
=========
            <Route path='/post' element={<FeedDetailPage />} />
>>>>>>>>> Temporary merge branch 2
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
