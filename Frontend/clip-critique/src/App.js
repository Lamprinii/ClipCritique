import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import Footer from './Components/Footer';
import VideoPage from './Components/VideoPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './Components/MenuBar';
import VideoList from './Components/VideoList';
import UploadVideo from './Components/UploadVideo';
import Register from './Components/Register';
import Login from './Components/Login';
import { useState,createContext,useRef,useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminPanelUsers from './Components/admin-panel/AdminPanelUsers';
import refreshPageService from './services/refresh.page.service.js';
import ForYouPage from './Components/ForYouPage.jsx';

export const UserContext = createContext();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const hasRun = useRef(false);

  useEffect(() => {
    setIsLoading(true);
    if(!hasRun.current){
      if(refreshPageService.getReload() === 'true'){
        hasRun.current = true;

       refreshPageService.onPageLoad()
        .then((localUser) => {
          if (localUser != null) {
            setUser(localUser);
            setIsLoggedIn(refreshPageService.getIsLoggedIn());
          }
        }).catch((error) => {
          // Handle any errors during fetching
          console.error("Error fetching localUser:", error);
        })
        .finally(() => {
          console.log("user: ",user);
          setIsLoading(false);
        });
        
      }
      refreshPageService.setReload(true);
      
    }
    
  }, []);

  useEffect(() => {
    if(user != ""){
      refreshPageService.onPageRefresh(isLoggedIn,user.id);
    }
  },[isLoggedIn,user])


    return(<div className="App p-1" > 
    
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser,isAdmin,setIsAdmin}}>
    <Router>
      <header>
        <MenuBar>
          
        </MenuBar>
      </header>
      <Routes>
      <Route exact path="/" element={<ForYouPage />} />
      <Route exact path="/videolist" element={<VideoList />} />
      <Route path="/video" element={<VideoPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />


      <Route path="/admin-panel/users" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={isAdmin}>
                    <AdminPanelUsers/>
                  </ProtectedRoute>
              }/>

      <Route path="/upload" 
                element={
                  <ProtectedRoute isLoading={isLoading} isAuthenticated={isLoggedIn} hasPermission={true}>
                    <UploadVideo/>
                  </ProtectedRoute>
              }/>

      </Routes>
    </Router>
    <Footer>

    </Footer>
    
    
    </UserContext.Provider>
    
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>);
}
export default App;