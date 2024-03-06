import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryWrapper } from './style'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import {
  changeCurrentCategoryAction,
  fetchSongsListAction
} from '../../store/songs'

interface IProps {
  children?: ReactNode
}

const SongsCategory: FC<IProps> = () => {
  const { category } = useAppSelector(
    (state) => ({
      category: state.songs.category
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()
  /* 使用useNavigate进行跳转，有不同的传参方式 */
  /* searchParams 传参	navigate("/page1?name=Eula&age=18");	useSearchParams（）
      params传参	navigate("/page1/Eula/18")需要路由表添加占位: path: “/page1/:name/:age”	useParams（）
      state传参	navigate("/page1",{ state: {name:'Eula',age:"18"}})	useLocation（）
   */

  const navigate = useNavigate()
  function selectCategory(name: string) {
    if (name !== '全部') {
      navigate(`/discover/songs/?cat=${name}`)
    } else {
      navigate(`/discover/songs`)
    }
    dispatch(changeCurrentCategoryAction(name))
    dispatch(fetchSongsListAction(0)) // 参数是页数
  }

  return (
    <CategoryWrapper>
      <div className="arrow sprite_icon"></div>
      <div className="all">
        <span className="link" onClick={() => selectCategory('全部')}>
          全部风格
        </span>
      </div>
      <div className="category">
        {category.map((item, index) => {
          return (
            /* dl 自定义列表项(包裹dt和dd) dt 列表主题 dd 列表主题对应的内容项 */
            <dl key={item.name} className={'item' + index}>
              <dt>
                <i className="icon sprite_icon2"></i>
                <span>{item.name}</span>
              </dt>
              <dd>
                {item.subs.map((sItem: any) => {
                  return (
                    <div className="item" key={sItem.name}>
                      <span
                        className="link"
                        onClick={() => selectCategory(sItem.name)}
                      >
                        {sItem.name}
                      </span>
                      <span className="divider">|</span>
                    </div>
                  )
                })}
              </dd>
            </dl>
          )
        })}
      </div>
    </CategoryWrapper>
  )
}

export default memo(SongsCategory)
