import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

/** Returns a function that sets the shop category filter and navigates to /shop. */
export function useGoToCategory() {
  const navigate = useNavigate();
  const { setSelectedCategory } = useStore();
  return (category: string) => {
    setSelectedCategory(category);
    navigate('/shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
