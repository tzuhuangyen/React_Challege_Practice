import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductModal from '../../components/ProductModal';
import { Modal } from 'bootstrap';
import DeleteModal from '../../components/DeleteModal';
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create'); //"edit"
  const [tempProduct, setTempProduct] = useState({});

  const productModal = useRef(null);
  const deleteModal = useRef(null);
  //loading 取得token 並儲存到cookie 並取得產品
  useEffect(() => {
    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getProduct();
  }, []);

  const getProduct = async () => {
    const productRes = await axios.get(
      `/v2/api/${import.meta.env.VITE_REACT_APP_API_PATH}/admin/products`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };
  const closeProductModel = () => {
    productModal.current.hide();
  };
  const openDeleteModal = (product) => {
    setTempProduct(product);
    deleteModal.current.show();
  };
  const closeDeleteModel = () => {
    deleteModal.current.hide();
  };
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${import.meta.env.VITE_REACT_APP_API_PATH}/admin/product/${id}`
      );
      if (res.data.success) {
        getProduct();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {' '}
      <div className='p-3'>
        <ProductModal
          closeProductModel={closeProductModel}
          getProduct={getProduct}
          tempProduct={tempProduct}
          type={type}
        />
        <DeleteModal
          close={closeDeleteModel}
          text={tempProduct.title}
          handleDelete={deleteProduct}
          id={tempProduct.id}
        />
        <h3>產品列表</h3>
        <hr />
        <div className='text-end'>
          <button
            onClick={() => openProductModal('create')}
            type='button'
            className='btn btn-primary btn-sm'
          >
            建立新商品
          </button>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>分類</th>
              <th scope='col'>名稱</th>
              <th scope='col'>售價</th>
              <th scope='col'>啟用狀態</th>
              <th scope='col'>編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enable ? 'active' : 'inactive'}</td>
                  <td>
                    <button
                      onClick={() => openProductModal('edit', product)}
                      type='button'
                      className='btn btn-primary btn-sm'
                    >
                      編輯
                    </button>
                    <button
                      type='button'
                      className='btn btn-outline-danger btn-sm ms-2'
                      onClick={() => {
                        openDeleteModal(product);
                      }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <nav aria-label='Page navigation example'>
          <ul className='pagination'>
            <li className='page-item'>
              <a className='page-link disabled' href='/' aria-label='Previous'>
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            {[...new Array(5)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className='page-item' key={`${i}_page`}>
                <a className={`page-link ${i + 1 === 1 && 'active'}`} href='/'>
                  {i + 1}
                </a>
              </li>
            ))}
            <li className='page-item'>
              <a className='page-link' href='/' aria-label='Next'>
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminProducts;
