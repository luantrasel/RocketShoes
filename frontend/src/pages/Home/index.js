import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map((item) => ({
        ...item,
        priceFormatted: formatPrice(item.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map((item) => (
        <li key={item.id}>
          <img src={item.image} alt={item.title} />
          <strong>{item.title}</strong>
          <span>{item.priceFormatted}</span>

          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#fff" />
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
