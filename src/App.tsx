import './index.css';
import { Navbar } from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecipeLayout } from './pages/Recipe';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Footer } from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import RecipeDetail from './components/ui/cards/RecipeDetail';
import EmptyRecipe from './components/ui/cards/EmptyRecipe';
import { ProfileLayout } from './pages/Profile';
function App() {
  return (
    <>
      <Router>
        <div className='flex flex-col w-full h-full min-h-screen justify-between overflow-x-hidden p-5'>
          <header>
            <Navbar />
          </header>
          <main className='flex flex-col items-center justify-center h-full w-full min-h-[65vh] border-2 border-blue-500'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/recipes' element={<RecipeLayout />}>
                  <Route index element={<EmptyRecipe />} />
                  <Route path=':id' element={<RecipeDetail />} />
                </Route>
                <Route path='/profile' element={<ProfileLayout />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
          <div></div>
          <Footer />
        </div>
      </Router>
      {/* <Modal>
        <MailForm />
      </Modal> */}
    </>
  );
}

export default App;
