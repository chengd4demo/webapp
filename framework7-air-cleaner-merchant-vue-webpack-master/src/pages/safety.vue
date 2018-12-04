<template>
  <f7-page>
    <f7-navbar title="安全" back-link="" style="background:#e94e24;"></f7-navbar>
    <f7-list media-list class="no-margin-v" style="margin-top:1px">
      <ul>
        <li class="media-item"><a href="/modify-phone/" class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title">
                  <img src="../img/phone.png" style="max-width: 15px;max-height: 15px;vertical-align: middle"/>&nbsp;修改手机号码
                </div>
              </div>
            </div>
          </div>
        </a></li>
        <li class="media-item"><a href="/set-password/" class="item-link">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title">
                  <img src="../img/ud.png" style="max-width: 15px;max-height: 15px;vertical-align: middle"/>&nbsp;设置提现密码
                </div>
              </div>
            </div>
          </div>
        </a></li>
      </ul>
    </f7-list>
  </f7-page>
</template>

<script>
  export default {
    name: "safety"
  }
</script>

<style scoped>

</style>
