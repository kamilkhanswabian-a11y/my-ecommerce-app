import { useContext } from 'react';
import Card from '../components/Card';
import { useQuery } from '@tanstack/react-query';
import { FilterContext } from '../Context/FilteterContext';

function FeaturedProducts() {
  // Fetch from Mock API
  const { data, isLoading } = useContext(FilterContext);
  // Get featured items
  const featured = data.filter(item => item.featured).slice(0, 5);

  if (isLoading) return <div>Loading featured items...</div>;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Card key={product.id} data={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeaturedProducts;