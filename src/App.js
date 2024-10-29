import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { Helmet } from 'react-helmet';

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
            <Route />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
