import React from 'react';
import AuthProvider from './auth/AuthProvider';
import AppRouter from './routers/AppRouter';

function App() {

  return (
    <AuthProvider >
      <AppRouter/>
    </AuthProvider>
  );
}

export default App;
