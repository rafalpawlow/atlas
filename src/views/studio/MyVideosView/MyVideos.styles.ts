import styled from '@emotion/styled'

import { DismissibleBanner } from '@/components/DismissibleBanner'
import { Grid } from '@/components/Grid'
import { LimitedWidthContainer } from '@/components/LimitedWidthContainer'
import { Pagination } from '@/components/Pagination'
import { Text } from '@/components/Text'
import { Button } from '@/components/_buttons/Button'
import { Select } from '@/components/_inputs/Select'
import { media, sizes } from '@/styles'

export const StyledLimitedWidthContainer = styled(LimitedWidthContainer)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 120px;
`

export const StyledText = styled(Text)`
  margin: ${sizes(12)} 0;
`

export const TabsContainer = styled.div`
  margin-bottom: ${sizes(12)};
`

export const TabControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  ${media.sm} {
    display: grid;
    align-items: center;
    grid-template-columns: auto auto;
  }
  ${media.md} {
    gap: ${sizes(4)};
    grid-template-columns: minmax(230px, 250px) max-content;
  }
`

export const StyledGrid = styled(Grid)`
  grid-auto-rows: 1fr;
`

export const StyledPagination = styled(Pagination)`
  padding-top: ${sizes(12)};
  padding-bottom: ${sizes(16)};
`

export const StyledDismissibleBanner = styled(DismissibleBanner)`
  margin-bottom: ${sizes(12)};
`

export const MobileButton = styled(Button)`
  margin-bottom: ${sizes(12)};
`

export const StyledSelect = styled(Select)`
  margin-bottom: ${sizes(4)};
  ${media.sm} {
    margin-left: auto;
    width: 250px;
  }
` as typeof Select
