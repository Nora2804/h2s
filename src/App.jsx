import { useState, useEffect } from 'react'

// import './App.css'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/Product'
import ProductDetailPage from './pages/ProductDetail'
import { addProduct, deleteProduct, updateProduct } from './api/product'
import ProductManagementPage from './pages/Admin/ProductManagement'
import AddProductPage from './pages/Admin/AddProduct'
import Dashboard from './pages/Admin/Dashboard'
import Home from './pages/Layout/Home'
import AdminLayout from './pages/Layout/AdminLayout'

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('http://localhost:5173/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])
  const onHandleRemove = (id) => {
    // fetch('http://localhost:3000/products/' + id, {
    //   method: 'DELETE'
    // }).then(() => setProducts(products.filter(item => item.id !== id)))
    deleteProduct(id).then(() => setProducts(products.filter(item => item.id !== id)))
  }
  const onHandleAdd = (product) => {
    addProduct(product).then(() => setProducts([...products, product]))
  }
  const onHandleUpdate = (product) => {
    updateProduct(product)
  }
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductPage products={products} onRemove={onHandleRemove} />} />
        <Route path='/products/:id' element={<ProductDetailPage />} />
        <Route path='/admin/products' element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
        <Route path='/admin/products/add' element={<AddProductPage onAdd={onHandleAdd} />} />
        <Route path='/admin/products/:id/update' element={<UpdateProductPage products={products} onUpdate={onHandleUpdate} />} /> */}
        <Route path='/' element={<Home />}>
          <Route index element={<HomePage />} /> {/* / - Home */}
          <Route path='products'>
            <Route index element={<ProductPage products={products} onRemove={onHandleRemove} />} />
            <Route path=':id' element={<ProductDetailPage />} /> {/* /products/:id - Detail */}
          </Route>
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='products'>
            <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} />} />
          </Route>
        </Route>
      </Routes>

    </div >
  )
}

export default App