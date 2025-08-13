import RecipeAside from '../components/ui/nav/RecipeAside';
import RecipeDetailContainer from '../components/ui/nav/RecipeDetailContainer';

export const RecipeLayout = () => {
  return (
    <section className='flex items-center justify-between w-[80%] h-full'>
      <RecipeAside />
      <RecipeDetailContainer />
    </section>
  );
};
