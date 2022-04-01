import React, { useState } from 'react'

import { Pill } from '@/components/Pill'
import { SvgActionShow } from '@/components/_icons'
import { VideoThumbnail, VideoThumbnailProps } from '@/components/_video/VideoThumbnail'
import { useGetNftSlot } from '@/hooks/useGetNftSlot'
import { EnglishTimerState } from '@/hooks/useNftState'
import { formatNumberShort } from '@/utils/number'
import { formatDurationShort } from '@/utils/time'

import { Container } from './NftTile.styles'
import { NftTileDetails } from './NftTileDetails'

export type Member = {
  assetUrl?: string | null
  name?: string
  onClick?: () => void
  loading?: boolean
}

export type NftTileProps = {
  status?: 'idle' | 'buy-now' | 'auction'
  onNftPurchase?: () => void
  onNftBuyNow?: () => void
  thumbnail?: VideoThumbnailProps
  title?: string | null
  owner?: Member
  creator?: Member
  loading?: boolean
  duration?: number | null
  views?: number | null
  buyNowPrice?: number | null
  startingPrice?: number | null
  topBidAmount?: number | null
  fullWidth?: boolean
  interactable?: boolean
  canPutOnSale?: boolean
  canCancelSale?: boolean
  canBuyNow?: boolean
  canMakeBid?: boolean
  timerLoading?: boolean
  needsSettling?: boolean
  englishTimerState?: EnglishTimerState
  startsAtDate?: Date
  auctionPlannedEndDate?: Date
  onRemoveFromSale?: () => void
  onPutOnSale?: () => void
  onNftChangePrice?: () => void
}

export const NftTile: React.FC<NftTileProps> = ({
  status,
  onNftPurchase,
  onNftBuyNow,
  thumbnail,
  loading,
  title,
  creator,
  owner,
  duration,
  views,
  buyNowPrice,
  startingPrice,
  topBidAmount: topBid,
  fullWidth,
  interactable = true,
  canPutOnSale,
  canCancelSale,
  canBuyNow,
  canMakeBid,
  timerLoading,
  needsSettling,
  englishTimerState,
  startsAtDate,
  auctionPlannedEndDate,
  onRemoveFromSale,
  onPutOnSale,
  onNftChangePrice,
}) => {
  const [hovered, setHovered] = useState(false)
  const leftBottomPills = useGetNftSlot({
    withNftLabel: false,
    hasBuyNowPrice: !!buyNowPrice,
    timerLoading,
    needsSettling,
    status,
    englishTimerState,
    startsAtDate,
    auctionPlannedEndDate,
  })

  return (
    <Container fullWidth={fullWidth}>
      <VideoThumbnail
        videoHref={thumbnail?.videoHref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        loading={loading}
        thumbnailUrl={thumbnail?.thumbnailUrl}
        clickable={false}
        slots={{
          topLeft: views
            ? {
                element: (
                  <Pill label={formatNumberShort(views)} size="medium" icon={<SvgActionShow />} variant="overlay" />
                ),
              }
            : undefined,
          bottomLeft: leftBottomPills,
          bottomRight: duration
            ? { element: <Pill label={formatDurationShort(duration)} size="medium" variant="overlay" /> }
            : undefined,
        }}
      />
      <NftTileDetails
        onNftPurchase={onNftPurchase}
        onNftBuyNow={onNftBuyNow}
        videoHref={thumbnail?.videoHref as string}
        hovered={hovered}
        owner={owner}
        nftStatus={status}
        buyNowPrice={buyNowPrice}
        loading={loading}
        topBid={topBid}
        creator={creator}
        title={title}
        startingPrice={startingPrice}
        interactable={interactable}
        onRemoveFromSale={onRemoveFromSale}
        canBuyNow={canBuyNow}
        canCancelSale={canCancelSale}
        canMakeBid={canMakeBid}
        canPutOnSale={canPutOnSale}
        onPutOnSale={onPutOnSale}
        onNftChangePrice={onNftChangePrice}
      />
    </Container>
  )
}
