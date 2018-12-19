<template>
  <f7-page :page-content="false">
    <f7-navbar title="提现记录" back-link="" style="background:#e94e24;"></f7-navbar>
    <f7-toolbar tabbar style="background:#FFF; box-shadow: -2px 0 3px -1px green">
      <f7-link tab-link="#tab-1" tab-link-active text="已申请"></f7-link>
      <f7-link tab-link="#tab-2" text="未领取"></f7-link>
      <f7-link tab-link="#tab-3" text="已取消"></f7-link>
			<f7-link tab-link="#tab-4" text="已完成"></f7-link>
    </f7-toolbar>

    <f7-tabs>
      <f7-tab id="tab-1" class="page-content" tab-active>
        <f7-block>
          <p>Tab 1 </p>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-2" class="page-content">
        <f7-block>
          <p>Tab 2 </p>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-3" class="page-content">
        <f7-block>
          <p>Tab 3 </p>
        </f7-block>
      </f7-tab>
			<f7-tab id="tab-4" class="page-content">
				<f7-block>
					<p>Tab 4 </p>
				</f7-block>
			</f7-tab>
    </f7-tabs>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7Tabs, f7Tab, f7Link, f7Toolbar, f7NavRight } from 'framework7-vue';
  export default {
    components: {
      f7Navbar, f7Page, f7Block, f7Tabs, f7Tab, f7Link, f7Toolbar, f7NavRight,
    },
    methods: {
     /* toggleToolbarPosition() {
        this.$$(this.$el).find('.toolbar, .tabbar').toggleClass('toolbar-bottom-md');
      }, */
    },
  };
</script>
<style>
	.ios .toolbar {
    height: 44px;
    font-size: 17px;
    background: #f7f7f8;
    top: 44px;
}
.ios .navbar ~ *:not(.no-navbar) .page-content,
.ios .navbar ~ .page-content {
  padding-top: 104px;
}
.md .tabbar a.tab-link.tab-link-active, .md .tabbar-labels a.tab-link.tab-link-active, .md .tabbar a.tab-link.active-state, .md .tabbar-labels a.tab-link.active-state {
    color: #e94e24;
}
.md .tabbar a.tab-link, .md .tabbar-labels a.tab-link{
	color: black;
}

.md .tabbar .tab-link-highlight, .md .tabbar-labels .tab-link-highlight{
	background:#84d4f9;
}
.md .timeline-item-inner {
  border-radius: 2px;
  padding: 8px 16px;
  -webkit-box-shadow: 0 0px 0px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>