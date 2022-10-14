import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// page
import HomePage from './pages/HomePage';
import FollowingPage from './pages/FollowingPage';
import UploadPage from './pages/UploadPage';
import UserPage from './pages/UserPage';
import VideoPage from './pages/VideoPage';
// Layout
import MainLayout from './layouts/MainLayout';
import OnlyHeader from './layouts/OnlyHeader';
import FormLogin from './components/FormLogin';
import { useSelector } from 'react-redux';
import API from './api/api';

function App() {
  const show = useSelector(state => state.appState.isShowModalLogin)
  const user = useSelector(state => state.auth.token);
  API.defaults.headers.common = { 'Authorization': `Bearer ${user}` }
  return (
    <Router>
      <div className="App relative">
        {show && <FormLogin />}
        <Routes>
          <Route path='/' element={<MainLayout><HomePage /></MainLayout>}></Route>
          <Route path='/following' element={<MainLayout><FollowingPage /></MainLayout>}></Route>
          <Route path='/upload' element={<OnlyHeader><UploadPage /></OnlyHeader>}></Route>
          <Route path='/@:nickname' element={<OnlyHeader><UserPage /></OnlyHeader>}></Route>
          <Route path='/@:nickname/video/:id' element={<VideoPage></VideoPage>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
