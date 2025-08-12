import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Layout from './Layout'
import ProfilePage from './pages/ProfilePage'
import PlaylistPage from './pages/PlaylistPage'
import CollectionPage from './pages/CollectionPage'
import SearchPage from './pages/SearchPage'
import GenrePage from './pages/GenrePage'
import HistoryPage from './pages/HistoryPage'
import MusicPage from './pages/MusicPage'
import ArtistPage from './pages/ArtistPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import UserContextProvider from './UserContext'
import AdminPage from './pages/AdminPage'
import MusicContextProvider from './MusicContext'


function App() {

  axios.defaults.baseURL='http://localhost:4000'
  axios.defaults.withCredentials = true

  return (
    <UserContextProvider>
      <MusicContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path='/artist' element={<ProfilePage />} />
            <Route path='/music/:musicId' element={<MusicPage />} />
            <Route path='/playlist' element={<CollectionPage />} />
            <Route path='/playlist/:playlistId' element={<PlaylistPage />} />
            <Route path='/admin' element={<AdminPage />}/>
            <Route path='/search' element={<SearchPage />} />
            <Route path='/search/recent' element={<HistoryPage />} />
            <Route path='/search/recent/:searchParam' element={<HistoryPage />} />
            <Route path='/genre/:genre' element={<GenrePage />} />
            <Route path='/artist/:artistId' element={<ArtistPage />} />
          </Route>

          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
        </Routes>
      </MusicContextProvider>
    </UserContextProvider>
  )
}

export default App
