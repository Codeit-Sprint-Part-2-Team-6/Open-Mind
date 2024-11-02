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
        <title>11-6팀 오픈마인드</title>
        <meta name='keywords' content='기초프로젝트, 프론트앤드 11기 6팀, 오픈마인드, 코드잇' />
        <meta
          name='description'
          content='익명성을 보장하며 CRUD(Create, Read, Update, Delete) 기능을 구현하는 웹 애플리케이션입니다.'
        />
        <meta property='og:site_name' content='11-6팀 오픈마인드' />
        <meta property='og:title' content='11-6팀 오픈마인드' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content='익명성을 보장하며 CRUD(Create, Read, Update, Delete) 기능을 구현하는 웹 애플리케이션입니다.'
        />
        <meta
          property='og:image'
          content='https://open-mind-team-6.netlify.app/public/images/meta/SumMeta.png'
        />
        <meta property='og:url' content='https://open-mind-team-6.netlify.app' />
        <link rel='icon' href='/images/meta/favicon.ico' type='image/x-icon' />
        <link href='https://fonts.googleapis.com/css2?family=Actor&display=swap' rel='stylesheet' />
        <link
          rel='stylesheet'
          as='style'
          crossorigin
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
