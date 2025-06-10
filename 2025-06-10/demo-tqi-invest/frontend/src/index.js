import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import InvestmentList from './components/InvestmentList';
import InvestmentDetail from './components/InvestmentDetail';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/investimentos" exact component={InvestmentList} />
          <Route path="/investimentos/:id" component={InvestmentDetail} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));