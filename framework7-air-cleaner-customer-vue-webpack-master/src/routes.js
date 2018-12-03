import HomePage from './pages/home.vue';
import DevicePrice from './pages/deviceprice.vue';
import AboutPage from './pages/homepage/center.vue';
import FormPage from './pages/form.vue';
import AddressPage from './pages/address.vue';
import RecordPage from './pages/record.vue';
import EquipmentListPage from './pages/equipment.vue';
import MonitorPage from './pages/monitor.vue';
import StatePage from './pages/state.vue';
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
    path: '/address/',
    component: AddressPage,
  },
  {
    path:'/center/',
    component:CenterPage,
  },
  {
    path: '/record/',
    component: RecordPage,
  },
  {
    path: '/equipment-list/',
    component: EquipmentListPage,
  },
  {
    path:'/monitor/',
    component:MonitorPage,
  },
  {
    path:'/state/',
    component:StatePage,
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
