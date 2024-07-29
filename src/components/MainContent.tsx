import { useEffect, useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { Tally3 } from 'lucide-react';
import axios from 'axios';

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Error Fething data', error);
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );

      console.log(filteredProducts);
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (products) => products.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const filtererdProducts = getFilteredProducts();

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[44rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative my-5">
            <button
              className="border px-4 py-2 rounded-full flex items-center"
              onClick={() => setDropDownOpen(!dropDownOpen)}
            >
              <Tally3 className="mr-3" />

              {filter === 'all'
                ? 'Filter'
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>

            {dropDownOpen && (
              <div className="absolute  bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter('cheap')}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter('expensive')}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter('popular')}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* BookCard */}
        </div>
      </div>
    </section>
  );
};

export default MainContent;
