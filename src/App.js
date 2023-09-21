import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  CalibrationScheduleCreateForm 
 } from './ui-components';

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <CalibrationScheduleCreateForm /> 
      </header>
    </div>
  );
}

export default withAuthenticator(App);
