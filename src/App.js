import './App.css'
import './styles/main.scss'
import Categories from './Pages/Categories'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import PokemonsList from './Pages/PokemonsList'
// import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Categories />} />
            <Route path=':id' element={<PokemonsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
