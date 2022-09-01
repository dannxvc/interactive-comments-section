import './App.css';
import Comments from './components/Comments';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <h1 className='title-screen-readers-only'>Interactive Comments Section</h1>
      <Comments/>
      <Footer/>
    </div>
  );
}

export default App;
