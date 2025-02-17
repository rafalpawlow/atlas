import React, { FC, useMemo } from 'react'

import { useMostViewedVideosAllTimeIds } from '@/api/hooks'
import { useMostViewedVideos } from '@/api/hooks'
import { useMostViewedChannelsAllTimeIds } from '@/api/hooks'
import { InfiniteChannelWithVideosGrid, InfiniteVideoGrid } from '@/components/InfiniteGrids'
import { ViewErrorFallback } from '@/components/ViewErrorFallback'
import { VideoContentTemplate } from '@/components/_templates/VideoContentTemplate'
import { VideoGallery } from '@/components/_video/VideoGallery'
import { absoluteRoutes } from '@/config/routes'
import { CtaData } from '@/types/cta'
import { SentryLogger } from '@/utils/logs'

const CTA: CtaData[] = ['new', 'home', 'channels']
const ADDITIONAL_LINK = { name: 'Browse channels', url: absoluteRoutes.viewer.channels() }

export const PopularView: FC = () => {
  const {
    mostViewedVideosAllTime,
    loading: mostViewedVideosLoading,
    error: mostViewedVideosIdsError,
  } = useMostViewedVideosAllTimeIds(
    {
      limit: 200,
    },
    { onError: (error) => SentryLogger.error('Failed to fetch most viewed videos IDs', 'PopularView', error) }
  )
  const mostViewedVideosIds = useMemo(() => mostViewedVideosAllTime?.map((item) => item.id), [mostViewedVideosAllTime])
  const { mostViewedChannelsAllTime, error: mostViewedChannelsError } = useMostViewedChannelsAllTimeIds(
    { limit: 15 },
    { onError: (error) => SentryLogger.error('Failed to fetch most viewed channels IDs', 'PopularView', error) }
  )
  const mostViewedChannelsAllTimeIds = useMemo(
    () => mostViewedChannelsAllTime?.map((item) => item.id),
    [mostViewedChannelsAllTime]
  )
  const videoWhereInput = useMemo(() => ({ id_in: mostViewedVideosIds }), [mostViewedVideosIds])
  const {
    videos,
    loading,
    error: mostViewedVideosError,
  } = useMostViewedVideos(
    { timePeriodDays: 30, limit: 10 },
    { onError: (error) => SentryLogger.error('Failed to fetch videos', 'PopularView', error) }
  )

  if (mostViewedVideosIdsError || mostViewedVideosError || mostViewedChannelsError) {
    return <ViewErrorFallback />
  }

  return (
    <VideoContentTemplate title="Popular on Joystream" cta={CTA}>
      <VideoGallery hasRanking title="Top 10 this month" videos={videos} loading={loading} />
      <InfiniteVideoGrid
        title="Popular videos"
        videoWhereInput={videoWhereInput}
        ready={!mostViewedVideosLoading}
        onDemand
      />
      <InfiniteChannelWithVideosGrid
        title="Popular channels"
        onDemand
        idIn={mostViewedChannelsAllTimeIds}
        additionalLink={ADDITIONAL_LINK}
      />
    </VideoContentTemplate>
  )
}
