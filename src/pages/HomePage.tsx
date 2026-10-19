import Hero from '../components/home/Hero';
import CategoryShortcuts from '../components/home/CategoryShortcuts';
import BestSellers from '../components/home/BestSellers';
import ArtisanProcess from '../components/home/ArtisanProcess';
import SocialGallery from '../components/home/SocialGallery';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShortcuts />
      <BestSellers />
      <ArtisanProcess />
      <SocialGallery />
      <Newsletter />
    </>
  );
}
