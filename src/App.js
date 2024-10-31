import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { Helmet } from 'react-helmet';
import HomePage from './pages/Home/Homepage';
import FeedList from './pages/FeedList/FeedList';
import FeedDetailPage from './pages/FeedDetail/FeedDetailPage';

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
            <Route index element={<HomePage />} />
            <Route path='list' element={<FeedList />} />
            <Route path='/post' element={<FeedDetailPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
