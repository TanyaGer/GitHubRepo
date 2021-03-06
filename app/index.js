import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './index.css';

import { ThemeProvider } from './contexts/theme';

import Nav from './components/Nav';
import Loading from './components/Loading';

const Popular = React.lazy(() => import('./components/Popular'));
const Battle = React.lazy(() => import('./components/Battle'));
const Results = React.lazy(() => import('./components/Results'));

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () =>
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light',
      })),
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path='/' component={Popular} />
                  <Route exact path='/battle' component={Battle} />
                  <Route path='/battle/results' component={Results} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

const root = ReactDOMClient.createRoot(document.getElementById('app'));
root.render(<App />);
