import React, { useState } from 'react'

import { Button } from '@/components/_buttons/Button'
import { SvgActionNewTab, SvgSidebarChannel, SvgSidebarUpload, SvgSidebarVideos } from '@/components/_icons'
import { SvgJoystreamLogoStudio } from '@/components/_illustrations'
import { absoluteRoutes } from '@/config/routes'
import { chanelUnseenDraftsSelector, useDraftStore } from '@/providers/drafts'
import { useUploadsStore } from '@/providers/uploadsManager'
import { useUser } from '@/providers/user'

import { NavItemType, SidenavBase } from '../SidenavBase'

const studioNavbarItems: NavItemType[] = [
  {
    icon: <SvgSidebarVideos />,
    name: 'Videos',
    expandedName: 'My videos',
    to: absoluteRoutes.studio.videos(),
  },
  {
    icon: <SvgSidebarChannel />,
    name: 'Channel',
    expandedName: 'My channel',
    to: absoluteRoutes.studio.editChannel(),
  },
  {
    icon: <SvgSidebarUpload />,
    name: 'Uploads',
    expandedName: 'My uploads',
    to: absoluteRoutes.studio.uploads(),
  },
]

type SidenavStudioProps = {
  className?: string
}

export const SidenavStudio: React.FC<SidenavStudioProps> = ({ className }) => {
  const [expanded, setExpanded] = useState(false)
  const { activeChannelId } = useUser()
  const unseenDrafts = useDraftStore(chanelUnseenDraftsSelector(activeChannelId || ''))

  const uploadsStatus = useUploadsStore((state) => state.uploadsStatus)

  const assetsInProgress = Object.values(uploadsStatus).filter(
    (asset) => asset?.lastStatus === 'inProgress' || asset?.lastStatus === 'processing'
  )

  const studioNavbarItemsWithBadge = studioNavbarItems.map((item) => {
    if (item.to === absoluteRoutes.studio.videos()) {
      return { ...item, badgeNumber: unseenDrafts.length }
    }
    if (item.to === absoluteRoutes.studio.uploads()) {
      return { ...item, badgeNumber: assetsInProgress.length }
    }
    return item
  })

  return (
    <SidenavBase
      expanded={expanded}
      toggleSideNav={setExpanded}
      logoNode={<SvgJoystreamLogoStudio />}
      logoLinkUrl={absoluteRoutes.studio.index()}
      items={studioNavbarItemsWithBadge}
      buttonsContent={
        <Button
          variant="secondary"
          to={absoluteRoutes.viewer.index()}
          newTab
          onClick={() => setExpanded(false)}
          icon={<SvgActionNewTab />}
        >
          Joystream
        </Button>
      }
      className={className}
    />
  )
}
