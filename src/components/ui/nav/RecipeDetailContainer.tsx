import { Outlet } from 'react-router-dom';

const RecipeDetailContainer = () => (
  <div className='flex-1 h-full'>
    <Outlet />
  </div>
);

export default RecipeDetailContainer;
