import { styled } from 'styled-components'

export const LoginFormWrapper = styled.div`
  .textAlignRight {
    justify-content: flex-start;
    text-align: right;
    margin-bottom: 20px;
  }

  .mr80 {
    margin-right: 80px;
  }

  .forgetPwd {
    color: #666;
    cursor: pointer;
    margin-right: 18px;
  }

  .forgetPwd:hover {
    text-decoration: underline;
  }

  .register {
    color: #0c73c2;
    line-height: 18px;
    cursor: pointer;
    transform: translate(167px, -10px);
  }

  .register:hover {
    text-decoration: underline;
  }

  .gap {
    transform: translateY(-24px);
  }
`
