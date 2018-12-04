import SignPage from './pages/sign.vue';
import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import InboundPage from './pages/inbound.vue';
import OutBoundPage from './pages/outbound.vue';
import TraderMangementPage from'./pages/trader-management.vue';
import DeviceManagementPage from'./pages/device-management.vue';
import SafetyPage from'./pages/safety.vue';
import ModifyPhonePage from'./pages/modify-phone.vue';
import AffirmPhonePage from'./pages/affirm-phone.vue';
import SetPasswordPage from'./pages/set-password.vue';
import CashPage from './pages/cash.vue';
import PersonalInformationPage from './pages/personal-information.vue';
import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';


import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
  {
    path: '/',
    component: SignPage,
  },
  {
    path:'/home/',
    component:HomePage,
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
    component:TraderMangementPage,
  },
  {
    path:'/safety/',
    component:SafetyPage,
  },
  {
    path:'/modify-phone/',
    component:ModifyPhonePage,
  },
  {
    path:'/affirm-phone/',
    component:AffirmPhonePage,
  },
  {
    path:'/set-password/',
    component:SetPasswordPage,
  },
  {
    path:'/cash/',
    component:CashPage,
  },
  {
    path:'/personal-information/',
    component:PersonalInformationPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
