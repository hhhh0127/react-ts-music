import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  /* > 直接子元素 */
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      padding: 20px;
      width: 696px;
    }

    > .right {
      margin-left: 1px;
      width: 249px;
    }
  }
`
