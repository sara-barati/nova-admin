import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`

const MainContainer = styled.main`
  flex: 1;
  min-width: 0;
`

const PageContent = styled.div`
  padding: 24px;
`

function AdminLayout() {
  return (
    <LayoutContainer>
      <Sidebar />

      <MainContainer>
        <Header />

        <PageContent>
          <Outlet />
        </PageContent>
      </MainContainer>
    </LayoutContainer>
  )
}

export default AdminLayout