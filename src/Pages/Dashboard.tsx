import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpLeft, Package, Users, ShieldCheck, Zap } from 'lucide-react'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`

const WelcomeCard = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: clamp(24px, 4vw, 38px);
  border-radius: 20px;
  color: #fff;
  background:
    radial-gradient(circle at 88% 12%, rgba(243,111,33,.24), transparent 25%),
    linear-gradient(120deg, #142943 0%, #263F5C 100%);
  box-shadow: 0 14px 35px rgba(23, 43, 69, .18);

  &::after {
    content: '';
    position: absolute;
    width: 230px;
    height: 230px;
    border: 1px solid rgba(255,255,255,.15);
    border-radius: 50%;
    inset-inline-end: -75px;
    bottom: -145px;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    padding: 24px 20px;
  }
`

const WelcomeCopy = styled.div`
  position: relative;
  z-index: 1;
  max-width: 650px;

  span {
    display: inline-block;
    margin-bottom: 12px;
    color: #FFB27A;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .8px;
  }

  h1 {
    margin-bottom: 12px;
    font-size: clamp(25px, 3.5vw, 36px);
    line-height: 1.25;
  }

  p {
    max-width: 560px;
    color: rgba(255,255,255,.82);
    font-size: 14px;
    line-height: 1.9;
  }
`

const WelcomeIcon = styled.div`
  position: relative;
  z-index: 1;
  width: 74px;
  height: 74px;
  flex: 0 0 74px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 22px;
  background: rgba(255,255,255,.13);

  @media (max-width: 600px) { display: none; }
`

const SectionHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 { font-size: 19px; color: ${({ theme }) => theme.colors.text}; }
  p { font-size: 13px; color: ${({ theme }) => theme.colors.secondaryText}; }
`

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 650px) { grid-template-columns: 1fr; }
`

const ActionCard = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-width: 0;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.accent}80;
    box-shadow: 0 12px 28px rgba(20, 25, 40, .07);
  }

  @media (max-width: 480px) { padding: 18px; }
`

const ActionIcon = styled.div`
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accent}18;
`

const ActionText = styled.div`
  flex: 1;
  min-width: 0;

  h3 {
    margin: 2px 0 7px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 15px;
  }

  p {
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 13px;
    line-height: 1.7;
  }
`

const ArrowIcon = styled(ArrowUpLeft)`
  flex-shrink: 0;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.secondaryText};
`

const InfoCard = styled.section`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};

  svg { flex-shrink: 0; color: ${({ theme }) => theme.colors.accent}; }

  strong {
    display: block;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
  }

  p {
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 12px;
    line-height: 1.7;
  }
`

function Dashboard() {
  const { t } = useTranslation()

  return (
    <DashboardContainer>
      <WelcomeCard>
        <WelcomeCopy>
          <span>{t('dashboard.eyebrow')}</span>
          <h1>{t('dashboard.title')}</h1>
          <p>{t('dashboard.welcome')}</p>
        </WelcomeCopy>
        <WelcomeIcon><Zap size={34} /></WelcomeIcon>
      </WelcomeCard>

      <SectionHeading>
        <h2>{t('dashboard.quickActions')}</h2>
        <p>{t('dashboard.quickActionsDescription')}</p>
      </SectionHeading>

      <ActionGrid>
        <ActionCard to="/products">
          <ActionIcon><Package size={23} /></ActionIcon>
          <ActionText>
            <h3>{t('dashboard.productsCardTitle')}</h3>
            <p>{t('dashboard.productsCardDescription')}</p>
          </ActionText>
          <ArrowIcon size={19} />
        </ActionCard>

        <ActionCard to="/users">
          <ActionIcon><Users size={23} /></ActionIcon>
          <ActionText>
            <h3>{t('dashboard.usersCardTitle')}</h3>
            <p>{t('dashboard.usersCardDescription')}</p>
          </ActionText>
          <ArrowIcon size={19} />
        </ActionCard>
      </ActionGrid>

      <InfoCard>
        <ShieldCheck size={22} />
        <div>
          <strong>{t('dashboard.workspaceTitle')}</strong>
          <p>{t('dashboard.workspaceDescription')}</p>
        </div>
      </InfoCard>
    </DashboardContainer>
  )
}

export default Dashboard
