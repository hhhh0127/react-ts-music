import React, { memo, Fragment } from 'react'
import type { FC, ReactNode } from 'react'
import { AppFooterWrapper, FooterLeft, FooterRight } from './style'
import { footerLinks, footerImages } from '@/assets/data/local-data'

interface IProps {
  children?: ReactNode
}

/* 在 React 中，Fragment 和 div 可以互换使用。两者之间的主要区别是 Fragment 从 DOM 树中清除所有额外的 div，而 div 向 DOM 树中添加一个 div。
使用 React Fragments，我们可以创建更清晰、更容易阅读的代码。它渲染组件更快，使用的内存更少。每个元素都按预期呈现。而 div 会扩展 DOM，因为当你的网站上有太多的 HTML 标签时，会出现长嵌套节点。
 */

/* target="_blank"也是一个安全漏洞。新的页面可以通过window.opener 访问您的窗口对象，并且它可以使用 window.opener.location = newURL将您的页面导航至不同的网址。
其实就是当你使用target="_blank"打开一个新的标签页时，新页面的window对象上有一个属性 opener ,它指向的是前一个页面的window对象，因此，后一个新打开的页面就可以控制前一个页面了，事情就是这么的可怕。而且不管它是否跨域了，都是可以的。
在新打开的页面中，通过window.opener可以获取到源页面的部分控制权，即使新打开的页面是跨域也可以获取部分控制权。当a标签中加入了rel="noopener noreferrer"属性，就会window.opener会为null
 */

const AppFooter: FC<IProps> = () => {
  return (
    <AppFooterWrapper>
      <div className="wrap-v2 content">
        <FooterRight className="wrap-v1 right">
          {footerImages.map((item) => {
            return (
              <li className="item" key={item.link}>
                <a
                  className="link"
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                ></a>
                <span className="title">{item.title}</span>
              </li>
            )
          })}
        </FooterRight>
        <FooterLeft className="left">
          <div className="link">
            {footerLinks.map((item) => {
              return (
                <Fragment key={item.title}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  <span className="line">|</span>
                </Fragment>
              )
            })}
          </div>
          <div className="copyright">
            <span>网易公司版权所有©1997-2020</span>
            <span>杭州乐读科技有限公司运营：</span>
            <a
              href="https://p1.music.126.net/Mos9LTpl6kYt6YTutA6gjg==/109951164248627501.png"
              rel="noopener noreferrer"
              target="_blank"
            >
              浙网文[2018]3506-263号
            </a>
            <a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span></span>
              <span>浙公网安备 33010802013307号</span>
            </a>
          </div>
          <div className="report">
            <span>违法和不良信息举报电话：0571-89853516</span>
            <span>举报邮箱：</span>
            <a
              href="mailto:ncm5990@163.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ncm5990@163.com
            </a>
            <span>客户热线：951632298</span>
          </div>
          <div className="info">
            <span>粤B2-20090191-18</span>
            <a
              href="http://www.beian.miit.gov.cn/publish/query/indexFirst.action"
              rel="noopener noreferrer"
              target="_blank"
            >
              工业和信息化部备案管理系统网站
            </a>
          </div>
          <div className="auth">
            <span>
              互联网宗教信息服务许可证：浙（2022）0000120
              增值电信业务经营许可证：浙B2-20150198
            </span>
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              rel="noopener noreferrer"
              target="_blank"
            >
              粤B2-20090191-18&nbsp;&nbsp;工业和信息化部备案管理系统网站
            </a>
          </div>
        </FooterLeft>
      </div>
    </AppFooterWrapper>
  )
}

export default memo(AppFooter)
