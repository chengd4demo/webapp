import HomePage from './pages/home.vue';
import DevicePrice from './pages/deviceprice.vue';
import SignInOrUpPage from './pages/sign.vue';
import AboutPage from './pages/homepage/center.vue';
import FormPage from './pages/form.vue';
import AddressPage from './pages/address.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';
import CenterPage from './pages/homepage/center.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/sign/',
    component: SignInOrUpPage,
  },
  {
    path: '/address/',
    component: AddressPage,
  },
  {
    path:'/center/',
    component:CenterPage,
  },
  {
    path:'/price/',
    component:DevicePrice,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
  
];
