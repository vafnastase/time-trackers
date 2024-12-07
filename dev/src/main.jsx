import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Root } from './Root.jsx';
import { Dev } from './Dev.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root>
      <Dev />
    </Root>
  </StrictMode>,
)
