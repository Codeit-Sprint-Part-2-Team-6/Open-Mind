import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/Home/Homepage';
import FeedList from './pages/FeedList/FeedList';
import FeedDetailPage from './pages/FeedDetail/FeedDetailPage';
import ToggleThemeBtn from './components/ToggleTheme';
import { useState } from 'react';
import ForbiddenPage from './pages/Errors/ForbiddenPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <link href='https://fonts.googleapis.com/css2?family=Actor&display=swap' rel='stylesheet' />
        <link
          rel='stylesheet'
          as='style'
          crossorigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css'
        />
      </Helmet>

      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <ToggleThemeBtn isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Router>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path='/list' element={<FeedList />} />
            <Route path='/post/:id' element={<FeedDetailPage />} />
            <Route path='/post/:id/answer' element={<FeedDetailPage isAnswer={true} />} />
            <Route path='/403' element={<ForbiddenPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
