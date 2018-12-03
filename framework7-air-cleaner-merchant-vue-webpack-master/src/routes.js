import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import InboundPage from './pages/inbound.vue';
import OutBoundPage from './pages/outbound.vue';
import DeviceManagementPage from'./pages/device-management.vue';
import TraderManagementPage from '/pages/trader-management.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';


import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

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
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path:'/outbound/',
    component:OutBoundPage,
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
    path:'/inbound/',
    component:InboundPage,
  },
  {
    path:'/device-management/',
    component: DeviceManagementPage,
  },
  {
    path:'/trader-management/',
    component:TraderManagementPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
