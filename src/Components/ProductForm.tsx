import styled from 'styled-components'

import * as Yup from 'yup'

import type { CreateProduct } from '../types/product'
import { Formik, Form, Field, type FieldProps } from 'formik'
interface ProductFormProps {
  onSubmit: (values: CreateProduct) => Promise<void>
  onCancel: () => void
}

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`

const FormTitle = styled.h2`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.text};
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: ${({ theme }) => theme.colors.text};
  }
`

const StyledField = styled(Field)`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  outline: none;
  resize: vertical;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const FullWidth = styled.div`
  grid-column: 1 / -1;
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
`

const FormError = styled.div`
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.danger};
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const CancelButton = styled(Button)`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const validationSchema = Yup.object({
  title: Yup.string().trim().required('Title is required'),

  price: Yup.number()
    .typeError('Price must be a valid number')
    .moreThan(0, 'Price must be greater than zero')
    .required('Price is required'),

  description: Yup.string().trim().required('Description is required'),

  category: Yup.string().trim().required('Category is required'),

  image: Yup.string()
    .trim()
    .url('Enter a valid image URL')
    .required('Image URL is required'),
})

const initialValues: CreateProduct = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
}

function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  return (
    <FormContainer>
      <FormTitle>Add New Product</FormTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, submitCount }) => (
          <Form>
            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <FormError>
                Please check the following fields:
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </FormError>
            )}

            <FormGrid>
              <FormGroup>
                <label htmlFor="title">Product Title</label>

                <StyledField
                  id="title"
                  name="title"
                  placeholder="Enter product title"
                />

                {touched.title && errors.title && (
                  <ErrorText>{errors.title}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="price">Price</label>

                <StyledField
                  id="price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter price"
                />

                {touched.price && errors.price && (
                  <ErrorText>{errors.price}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="category">Category</label>

                <StyledField
                  id="category"
                  name="category"
                  placeholder="Enter category"
                />

                {touched.category && errors.category && (
                  <ErrorText>{errors.category}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="image">Image URL</label>

                <StyledField
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                />

                {touched.image && errors.image && (
                  <ErrorText>{errors.image}</ErrorText>
                )}
              </FormGroup>

              <FullWidth>
                <FormGroup>
                  <label htmlFor="description">Description</label>

                  <Field name="description">
                    {({ field }: FieldProps<string>) => (
                      <StyledTextArea
                        {...field}
                        id="description"
                        placeholder="Enter product description"
                      />
                    )}
                  </Field>

                  {touched.description && errors.description && (
                    <ErrorText>{errors.description}</ErrorText>
                  )}
                </FormGroup>
              </FullWidth>
            </FormGrid>

            <ButtonGroup>
              <CancelButton
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </CancelButton>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default ProductForm
