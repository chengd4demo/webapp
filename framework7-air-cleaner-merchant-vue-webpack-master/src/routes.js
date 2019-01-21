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
import AutoSignPage from './pages/sign.vue';


import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
  {
    path: '/',
    component: AutoSignPage,
    redirect: function (route, resolve, reject) {
      let weixin = localStorage.getItem('weixin')
      let userInfo = localStorage.getItem('M_USER_INFO')
      console.log()
      if(userInfo !=null && weixin!= null) {
        resolve('/home/')
      } else {
        resolve('/sign/')
      }
     
    }
  },
	{
		path:'/sign/',
		component:SignPage,
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
		path:'/outbound/',
		component:OutBoundPage,
	},
  {
    path:'/device-management/traderId/:traderId/',
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
    path:'/affirm-phone/verificationCode/:verificationCode/phoneNumber/:phoneNumber/',
    component:AffirmPhonePage,
  },
  {
    path:'/set-password/',
    component:SetPasswordPage,
  },
  {
    path:'/cash/availableAmount/:availableAmount/totalAcmount/:totalAcmount',
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
