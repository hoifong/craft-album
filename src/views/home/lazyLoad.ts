import AsyncLoad from '../../components/AsyncComponent';

export const LoginBox = AsyncLoad(() => import(/* webpackChunkName: 'login-box' */ './containers/LoginBox'));
export const TopNav = AsyncLoad(() => import(/* webpackChunkName: 'top-nav' */ './containers/TopNav'));
export const LeftArrow = AsyncLoad(() => import(/* webpackChunkName: 'arrow' */ './containers/LeftArrow'));
export const RightArrow = AsyncLoad(() => import(/* webpackChunkName: 'arrow' */ './containers/RightArrow'));
export const Progress = AsyncLoad(() => import(/* webpackChunkName: 'proggress' */ './containers/Progress'));
export const Trash = AsyncLoad(() => import(/* webpackChunkName: 'trash' */ './containers/Trash'));