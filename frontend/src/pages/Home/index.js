import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

function Home(props) {
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

  function handleAddProduct(product) {
    const { dispatch } = props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product)}>
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

// connect é utilizado por causa do redux
export default connect()(Home);
