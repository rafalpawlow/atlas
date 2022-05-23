import { CommentReactionsCountByReactionIdFieldsFragment } from '@/api/queries'
import { ReactionChipProps } from '@/components/_comments/ReactionChip'
import { REACTION_TYPE, ReactionId } from '@/config/reactions'

type GetCommentReactionsArgs = {
  commentId: string
  userReactions?: number[]
  reactionsCount: CommentReactionsCountByReactionIdFieldsFragment[]
  activeMemberId: string | null
  processingCommentReactionId: string | null
}

export const getCommentReactions = ({
  commentId,
  userReactions,
  reactionsCount,
  processingCommentReactionId,
}: GetCommentReactionsArgs): ReactionChipProps[] => {
  const defaultReactions: ReactionChipProps[] = Object.keys(REACTION_TYPE).map((reactionId) => ({
    reactionId: Number(reactionId) as ReactionId,
    customId: `${commentId}-${reactionId}`,
    state: 'processing' as const,
    count: 0,
  }))

  return defaultReactions.map((reaction) => {
    return {
      ...reaction,
      state: processingCommentReactionId === reaction.customId ? 'processing' : 'default',
      count: reactionsCount.find((r) => r.reactionId === reaction.reactionId)?.count || 0,
      active: !!userReactions?.find((r) => r === reaction.reactionId),
    }
  })
}
