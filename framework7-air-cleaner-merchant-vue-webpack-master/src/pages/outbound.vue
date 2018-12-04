<template>
  <f7-page>
    <f7-navbar title="收入明细" back-link="" style="background:#e94e24;"></f7-navbar>
    <div class="subnavbar">
        <div class="segmented segmented-raised">
          <a class="button tab-link tab-link-active" href="#">已申请</a>
          <a class="button tab-link" href="#">未领取</a>
          <a class="button tab-link" href="#">已取消</a>
          <a class="button tab-link" href="#">已完成</a>
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
