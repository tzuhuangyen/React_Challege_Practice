import axios from 'axios';
import { useState, useEffect } from 'react';

const ProductModal = ({ closeProductModel, getProduct, type, tempProduct }) => {
  const [tempData, setTempData] = useState({
    title: '',
    category: '',
    origin_price: 100,
    price: 300,
    unit: '件',
    description: '',
    content: '這是內容',
    is_enabled: true,
    imageUrl: '',
  });

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        category: '',
        origin_price: 100,
        price: 300,
        unit: '件',
        description: '',
        content: '這是內容',
        is_enabled: true,
        imageUrl: '',
      });
    } else if (type === 'edit') {
      setTempData(tempProduct);
    }
  }, [type, tempProduct]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (['price', 'origin_price'].includes(name)) {
      setTempData({ ...tempData, [name]: Number(value) });
    } else if (name === 'is_enabled') {
      setTempData({ ...tempData, [name]: checked });
    } else {
      // console.log(e);
      setTempData({ ...tempData, [name]: value });
    }
  };

  const submit = async () => {
    try {
      let api = `/v2/api/${
        import.meta.env.VITE_REACT_APP_API_PATH
      }/admin/product`;
      let method = 'post';
      if (type === 'edit') {
        api = `/v2/api/${
          import.meta.env.VITE_REACT_APP_API_PATH
        }/admin/product/${tempProduct.id}`;
        method = 'put';
      }
      const res = await axios[method](api, tempData);
      console.log(res);
      closeProductModel();
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className='modal fade'
        id='productModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' style={{ maxWidth: '800px' }}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title' id='productModal'>
                {type === 'create' ? 'create' : `edit${tempProduct.title}`}{' '}
                product
              </h1>
              <button
                type='button'
                className='btn-close'
                aria-label='Close'
                onClick={closeProductModel}
              ></button>
            </div>

            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-4'>
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='image'>
                      輸入圖片網址
                      <input
                        type='text'
                        name='imageUrl'
                        id='image'
                        placeholder='請輸入圖片連結'
                        className='form-control'
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='customFile'>
                      或 上傳圖片
                      <input
                        type='file'
                        id='customFile'
                        className='form-control'
                      />
                    </label>
                  </div>
                  <img src='' alt='' className='img-fluid' />
                </div>
                <div className='col-sm-8'>
                  <pre>{JSON.stringify(tempData)}</pre>
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='title'>
                      標題
                      <input
                        type='text'
                        id='title'
                        name='title'
                        placeholder='請輸入標題'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.title}
                      />
                    </label>
                  </div>
                  <div className='row'>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='category'>
                        分類
                        <input
                          type='text'
                          id='category'
                          name='category'
                          placeholder='請輸入分類'
                          className='form-control'
                          onChange={handleChange}
                          value={tempData.category}
                        />
                      </label>
                    </div>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='unit'>
                        單位
                        <input
                          type='unit'
                          id='unit'
                          name='unit'
                          placeholder='請輸入單位'
                          className='form-control'
                          onChange={handleChange}
                          value={tempData.unit}
                        />
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='origin_price'>
                        原價
                        <input
                          type='number'
                          id='origin_price'
                          name='origin_price'
                          placeholder='請輸入原價'
                          className='form-control'
                          onChange={handleChange}
                          value={tempData.origin_price}
                        />
                      </label>
                    </div>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='price'>
                        售價
                        <input
                          type='number'
                          id='price'
                          name='price'
                          placeholder='請輸入售價'
                          className='form-control'
                          onChange={handleChange}
                          value={tempData.price}
                        />
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='description'>
                      產品描述
                      <textarea
                        type='text'
                        id='description'
                        name='description'
                        placeholder='請輸入產品描述'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.description}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='content'>
                      說明內容
                      <textarea
                        type='text'
                        id='content'
                        name='content'
                        placeholder='請輸入產品說明內容'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.content}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2'>
                    <div className='form-check'>
                      <label
                        className='w-100 form-check-label'
                        htmlFor='is_enabled'
                      >
                        是否啟用
                        <input
                          type='checkbox'
                          id='is_enabled'
                          name='is_enabled'
                          className='form-check-input'
                          onChange={handleChange}
                          checked={tempData.is_enabled}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={closeProductModel}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={submit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductModal;
