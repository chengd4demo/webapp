import HomePage from './pages/sign.vue';
import DevicePrice from './pages/deviceprice.vue';
import AboutPage from './pages/homepage/center.vue';
import FormPage from './pages/form.vue';
import AddressPage from './pages/address.vue';
import RecordPage from './pages/record.vue';
import ReceivingAddressPage from './pages/receiving-address.vue';
import PersonalInformationPage from './pages/personal-information.vue';
import EquipmentListPage from './pages/equipment.vue';
import MonitorPage from './pages/monitor.vue';
import ConfirmPaymentPage from './pages/confirm-payment.vue';
import MsgPage from './pages/msg.vue';
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
    path:'/confirm-payment/',
    component:ConfirmPaymentPage,
  },
  {
    path:'/personal-information/',
    component:PersonalInformationPage,
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
    path:'/monitor/machno/:machno/',
    component:MonitorPage,
  },
  {
    path:'/msg/',
    component:MsgPage,
  },
  {
    path:'/price/machno/:machno',
    component:DevicePrice,
  },
  {
    path:'/receiving-address/',
    component:ReceivingAddressPage,
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
