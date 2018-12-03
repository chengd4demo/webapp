<template>
  <f7-page>
    <f7-navbar title="收入明细" back-link="后退"></f7-navbar>
    <div class="subnavbar">
      <div class="subnavbar-inner">
        <div class="segmented segmented-raised">
          <a class="button tab-link tab-link-active" href="#tab1">已申请</a>
          <a class="button tab-link" href="#tab2">未领取</a>
          <a class="button tab-link" href="#tab3">已取消</a>
          <a class="button tab-link" href="#tab4">已完成</a>
        </div>
      </div>
    </div>

  </f7-page>
</template>

<script>
    export default {
        name: "outbound"
    }
</script>

<style>

</style>
