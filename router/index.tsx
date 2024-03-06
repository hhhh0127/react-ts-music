/* 路由映射配置 */
import React, { lazy } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'

// import Download from '@/views/download'
// import Mine from '@/views/mine'
// import Focus from '@/views/focus'
// import Discover from '@/views/discover'
// import Album from '@/views/discover/c-views/album'
// import Artist from '@/views/discover/c-views/artist'
// import Djradio from '@/views/discover/c-views/djradio'
// import Ranking from '@/views/discover/c-views/ranking'
// import Recommend from '@/views/discover/c-views/recommend'
// import Songs from '@/views/discover/c-views/songs'
// 这样直接加载文件太大，需要做分包操作
// 使用懒加载
const Download = lazy(() => import('@/views/download'))
const Mine = lazy(() => import('@/views/mine'))
const Focus = lazy(() => import('@/views/focus'))
const Discover = lazy(() => import('@/views/discover'))

const Album = lazy(() => import('@/views/discover/c-views/album'))
const Artist = lazy(() => import('@/views/discover/c-views/artist'))
const Djradio = lazy(() => import('@/views/discover/c-views/djradio'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))
const Recommend = lazy(() => import('@/views/discover/c-views/recommend'))
const Songs = lazy(() => import('@/views/discover/c-views/songs'))
const Player = lazy(() => import('@/views/player'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      },
      {
        path: '/discover/player',
        element: <Player />
      }
    ]
  },
  {
    path: '/download',
    element: <Download />
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  }
]
export default routes
