import styled from 'styled-components'

import * as Yup from 'yup'

import type { CreateProduct } from '../types/product'
import { Formik, Form, Field, type FieldProps } from 'formik'
import { useTranslation } from 'react-i18next'
interface ProductFormProps {
  onSubmit: (values: CreateProduct) => Promise<void>
  onCancel: () => void
}

const FormContainer = styled.div`
  min-width: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(20, 25, 40, .035);

  @media (max-width: 600px) { padding: 18px; }
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
    border-color: ${({ theme }) => theme.colors.accent};
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
    border-color: ${({ theme }) => theme.colors.accent};
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

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    button { width: 100%; }
  }
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  transition: filter .18s ease, transform .18s ease;

  &:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }

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

const initialValues: CreateProduct = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
}

function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const { t } = useTranslation()
  const validationSchema = Yup.object({
    title: Yup.string().trim().required(t('validation.required')),
    price: Yup.number()
      .typeError(t('validation.priceNumber'))
      .moreThan(0, t('validation.pricePositive'))
      .required(t('validation.required')),
    description: Yup.string().trim().required(t('validation.required')),
    category: Yup.string().trim().required(t('validation.required')),
    image: Yup.string().trim().url(t('validation.invalidUrl')).required(t('validation.required')),
  })
  return (
    <FormContainer>
      <FormTitle>{t('products.formTitle')}</FormTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, submitCount }) => (
          <Form>
            {submitCount > 0 && Object.keys(errors).length > 0 && (
              <FormError>
                {t('products.checkFields')}
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </FormError>
            )}

            <FormGrid>
              <FormGroup>
                <label htmlFor="title">{t('products.titleLabel')}</label>

                <StyledField
                  id="title"
                  name="title"
                  placeholder={t('products.titlePlaceholder')}
                />

                {touched.title && errors.title && (
                  <ErrorText>{errors.title}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="price">{t('common.price')}</label>

                <StyledField
                  id="price"
                  name="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder={t('products.pricePlaceholder')}
                />

                {touched.price && errors.price && (
                  <ErrorText>{errors.price}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="category">{t('common.category')}</label>

                <StyledField
                  id="category"
                  name="category"
                  placeholder={t('products.categoryPlaceholder')}
                />

                {touched.category && errors.category && (
                  <ErrorText>{errors.category}</ErrorText>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="image">{t('common.image')}</label>

                <StyledField
                  id="image"
                  name="image"
                  placeholder={t('products.imagePlaceholder')}
                />

                {touched.image && errors.image && (
                  <ErrorText>{errors.image}</ErrorText>
                )}
              </FormGroup>

              <FullWidth>
                <FormGroup>
                  <label htmlFor="description">{t('common.description')}</label>

                  <Field name="description">
                    {({ field }: FieldProps<string>) => (
                      <StyledTextArea
                        {...field}
                        id="description"
                        placeholder={t('products.descriptionPlaceholder')}
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
                {t('common.cancel')}
              </CancelButton>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('products.adding') : t('products.addProduct')}
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default ProductForm
