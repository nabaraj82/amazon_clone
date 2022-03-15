import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import {useStateValue} from './StateProvider';
import { useEffect } from 'react';
import {auth} from './firebase';
import Payment from './Payment';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

function App() {
  const promise = loadStripe("pk_test_51K7N9PSCyXjjMDhu53tNNjYR6obIErvUH7HFzrCL1r18DhYo9CCWVMPgu4RXicvSzHZIAMaq5fVELFJtcgSLNOS800ww5sKria")
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged( authUser => {
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route 
          path="/payment"
          element ={
            <>
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>
            </>
          }
          />
          <Route
            path="/login"
            element={
            <Login />
          }
          />
          <Route 
          path="/" 
          element={
            <>
            <Header />
          <Home />
          </>
        }
           />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
