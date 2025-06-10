import { usePage } from '@inertiajs/react';

function BoysCollectionPage() {
  const { products, category } = usePage().props;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Boys Collection'}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-2 rounded">
            <img src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoysCollectionPage;
