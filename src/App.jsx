import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainContent from './assets/components/MainContent'
import { Container } from '@mui/material'

function App() {

  return (
    <>
      <div style={{
        display:"flex",
        justifyContent:"center",
        width:'100vw',
      }}>
        <Container maxWidth="lg">
          <MainContent/>
        </Container>
      </div>
    </>
  )
}

export default App
