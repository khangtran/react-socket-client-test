import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

//debug
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

//release
root.render(<App />)