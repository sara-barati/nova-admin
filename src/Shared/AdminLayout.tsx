import { useState } from 'react'
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
  min-height: 100vh;
`

const PageContent = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 22px 18px 32px;
  }

  @media (max-width: 480px) {
    padding: 18px 14px 28px;
  }
`

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <MainContainer>
        <Header
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen((current) => !current)}
        />

        <PageContent>
          <Outlet />
        </PageContent>
      </MainContainer>
    </LayoutContainer>
  )
}

export default AdminLayout
