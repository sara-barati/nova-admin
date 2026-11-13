import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css'

import productService from '../Utils/services/productService'
import ProductForm from '../Components/ProductForm'

import type { Product, CreateProduct } from '../types/product'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`

const PrimaryButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const ProductTable = styled.table`
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.surface};

  th,
  td {
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    text-align: start;
    color: ${({ theme }) => theme.colors.text};
  }

  th {
    background: ${({ theme }) => theme.colors.background};
  }
`

const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: white;
  padding: 4px;
`

const StatusMessage = styled.p`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
`

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await productService.getProducts()
      setProducts(data)
    } catch {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleAddProduct = async (values: CreateProduct) => {
    try {
      const newProduct = await productService.createProduct(values)

      setProducts((currentProducts) => [newProduct, ...currentProducts])

      setShowForm(false)

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Product added successfully!',
        showConfirmButton: false,
        timer: 2500,
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: 'Failed to add product. Please try again.',
        confirmButtonText: 'OK',
      })
    }
  }

  const filteredProducts = products.filter((product) => {
    const searchValue = search.trim().toLowerCase()

    return (
      product.title.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
    )
  })

  if (loading) {
    return <StatusMessage>Loading products...</StatusMessage>
  }

  if (error) {
    return (
      <PageContainer>
        <StatusMessage>{error}</StatusMessage>
        <PrimaryButton onClick={fetchProducts}>Try Again</PrimaryButton>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader>
        <h1>Products</h1>

        <PrimaryButton onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close Form' : 'Add Product'}
        </PrimaryButton>
      </PageHeader>

      {showForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      <SearchInput
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <StatusMessage>
          {search ? 'No products found.' : 'There are no products yet.'}
        </StatusMessage>
      ) : (
        <TableWrapper>
          <ProductTable>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <ProductImage src={product.image} alt={product.title} />
                  </td>

                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
        </TableWrapper>
      )}
    </PageContainer>
  )
}

export default Products
