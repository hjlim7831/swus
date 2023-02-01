import GroupPage from './pages/GroupPage/GroupPage';
import CreateArticle from './pages/GroupPage/CreateArticle';
import ArticleDetail from './pages/GroupPage/ArticleDetail';
import UpdateArticle from './pages/GroupPage/UpdateArticle';
import Container from '@mui/material/Container';
import { Provider } from 'react-redux';
import store from './store/Store';
import { 
  BrowserRouter,
  Routes,
  Route, 
} from 'react-router-dom';

// const audioContainer = document.querySelector("#audioContainer");
// const playBtn = document.querySelector(".start");
// const stopBtn = document.querySelector(".stop");

// function loadAudio() {
//   const source = document.querySelector("#audioSource");
//   source.src = "src/assets/music.mp3";
//   audioContainer.play();
//   playAudio();
// }

// function playAudio() {
//   audioContainer.volume = 0.6;
//   audioContainer.loop = true;
//   audioContainer.play();
// }

// function stopAudio(){
//   audioContainer.pause();
// }
// playBtn.addEventListener("click", loadAudio());
// stopBtn.addEventListener("click", stopAudio());

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Container fixed>
              {/* <Nav />
              <CssBaseline />
              <div className="App"> */}
              <div>
                <Routes>
                  <Route exact path="/" element={<GroupPage/>} />
                  <Route exact path="/group/create" element={<CreateArticle />} />
                  <Route exact path="/group/detail" element={<ArticleDetail />} />
                  <Route exact path="/group/update" element={<UpdateArticle />} />
                </Routes>
                <audio autoplay="autoplay" controls="controls">
                    <source src="https://docs.google.com/uc?export=open&id=14JlzHWUE2TqAsN237ft43SOw02xDPori" />     
                </audio>
                {/* <audio id="audioContainer">
                  <source id="audioSource" src="" />
                </audio>
                <ul className="controls">
                  <li className="start" value="start"><a href="javascript:;">재생</a></li>
                  <li className="stop" value="stop"><a href="javascript:;">정지</a></li>
                </ul> */}
              </div>
          </Container>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
