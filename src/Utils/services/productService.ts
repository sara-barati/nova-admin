import axiosInstance from '../api/axiosInstance'

import type {
  Product,
  CreateProduct,
} from '../../types/product'

const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<Product[]>('/products')

  return response.data
}

const createProduct = async (
  product: CreateProduct
): Promise<Product> => {
  const response = await axiosInstance.post<Product>(
    '/products',
    product
  )

  return response.data
}

const productService = {
  getProducts,
  createProduct,
}

export default productService