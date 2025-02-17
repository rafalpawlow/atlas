import styled from '@emotion/styled'

import { LayoutGrid } from '@/components/LayoutGrid'
import { LimitedWidthContainer } from '@/components/LimitedWidthContainer'
import { sizes } from '@/styles'

export const StyledLimitedWidthContainer = styled(LimitedWidthContainer)`
  margin: 0 auto;
  padding: ${sizes(16)} 0;
`

export const FeaturedCategoriesContainer = styled(LayoutGrid)`
  margin: ${sizes(16)} 0;
`

export const CategoriesContainer = styled(LayoutGrid)`
  margin: ${sizes(12)} 0 ${sizes(16)} 0;
`
