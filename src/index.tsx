import React from 'react';
import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';
import App from './containers/App';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import Transactions from './features/expenses/pages';
import Budget from './containers/budget';
import Income from './features/income/pages/income';
import IncomeAdd from './features/income/pages/income-add';
import Preferences from './features/settings/pages';
import BudgetNew from './containers/budget-new';
import WalletEditor from './features/settings/pages/payment-method-editor';
import { Toaster } from 'react-hot-toast';
import { PerakoProvider } from './shared/hooks/perako-context';

const DefaultRoute = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = dateNow.getMonth() + 1;
  return <Redirect path='/' to={`/${year}/${month}`} />;
};

const NotFound = () => {
  return <div>not found</div>;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={DefaultRoute} />
        <Route path='/:year/:month'>
          <PerakoProvider>
            <App>
              <Route exact path='/:year/:month' component={Budget} />
              <Route path='/:year/:month/income' component={Income} />
              <Route path='/:year/:month/income/new' component={IncomeAdd} />
              <Route path='/:year/:month/expenses' component={Transactions} />
              <Preferences />
              <BudgetNew />
              <WalletEditor />
              {/* <WalletDetails /> */}
            </App>
          </PerakoProvider>
        </Route>
        <NotFound />
      </Switch>
    </Router>
    <Toaster position='bottom-center' />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
