import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'

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

  h1 {
    color: ${({ theme }) => theme.colors.text};
    font-size: clamp(22px, 3vw, 28px);
  }

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
  }
`

const SearchInput = styled.input`
  width: 100%;
  max-width: 380px;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  outline: none;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus { border-color: ${({ theme }) => theme.colors.accent}; }

  @media (max-width: 560px) { max-width: none; }
`

const PrimaryButton = styled.button`
  min-height: 44px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  transition: filter .18s ease, transform .18s ease;

  &:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
  font-weight: 650;
  white-space: nowrap;

  @media (max-width: 560px) { width: 100%; }
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
  const { t } = useTranslation()
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
      setError(t('products.loadError'))
    } finally {
      setLoading(false)
    }
  }, [t])

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
        title: t('products.addSuccess'),
        showConfirmButton: false,
        timer: 2500,
      })
    } catch {
      Swal.fire({
        icon: 'error',
        title: t('products.addError'),
        text: t('products.addError'),
        confirmButtonText: t('common.close'),
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
    return <StatusMessage>{t('products.loading')}</StatusMessage>
  }

  if (error) {
    return (
      <PageContainer>
        <StatusMessage>{error}</StatusMessage>
        <PrimaryButton onClick={fetchProducts}>{t('common.retry')}</PrimaryButton>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageHeader>
        <h1>{t('products.title')}</h1>

        <PrimaryButton onClick={() => setShowForm(!showForm)}>
          {showForm ? t('products.closeForm') : t('products.addProduct')}
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
        placeholder={t('products.searchPlaceholder')}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <StatusMessage>
          {search ? t('products.notFound') : t('products.empty')}
        </StatusMessage>
      ) : (
        <TableWrapper>
          <ProductTable>
            <thead>
              <tr>
                <th>{t('common.image')}</th>
                <th>{t('common.title')}</th>
                <th>{t('common.category')}</th>
                <th>{t('common.price')}</th>
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
