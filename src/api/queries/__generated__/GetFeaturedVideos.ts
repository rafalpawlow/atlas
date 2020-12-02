/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFeaturedVideos
// ====================================================

export interface GetFeaturedVideos_featuredVideos_video_category {
  __typename: "Category";
  id: string;
}

export interface GetFeaturedVideos_featuredVideos_video_media_location_HttpMediaLocation {
  __typename: "HttpMediaLocation";
  url: string;
}

export interface GetFeaturedVideos_featuredVideos_video_media_location_JoystreamMediaLocation {
  __typename: "JoystreamMediaLocation";
  dataObjectId: string;
}

export type GetFeaturedVideos_featuredVideos_video_media_location = GetFeaturedVideos_featuredVideos_video_media_location_HttpMediaLocation | GetFeaturedVideos_featuredVideos_video_media_location_JoystreamMediaLocation;

export interface GetFeaturedVideos_featuredVideos_video_media {
  __typename: "VideoMedia";
  id: string;
  pixelHeight: number;
  pixelWidth: number;
  location: GetFeaturedVideos_featuredVideos_video_media_location;
}

export interface GetFeaturedVideos_featuredVideos_video_channel {
  __typename: "Channel";
  id: string;
  avatarPhotoUrl: string | null;
  handle: string;
}

export interface GetFeaturedVideos_featuredVideos_video {
  __typename: "Video";
  id: string;
  title: string;
  description: string;
  category: GetFeaturedVideos_featuredVideos_video_category;
  views: number | null;
  duration: number;
  thumbnailUrl: string;
  createdAt: GQLDate;
  media: GetFeaturedVideos_featuredVideos_video_media;
  channel: GetFeaturedVideos_featuredVideos_video_channel;
}

export interface GetFeaturedVideos_featuredVideos {
  __typename: "FeaturedVideo";
  video: GetFeaturedVideos_featuredVideos_video;
}

export interface GetFeaturedVideos {
  featuredVideos: GetFeaturedVideos_featuredVideos[];
}
