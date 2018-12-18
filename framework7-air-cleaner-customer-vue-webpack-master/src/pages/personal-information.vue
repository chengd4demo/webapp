<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="个人信息设置" back-link="" style="background: #E94E24 !important;"></f7-navbar>
    <f7-list form>
      <div class="list inline-labels no-hairlines-md">
        <li class="item-content  item-input">
            <div class="item-title label person" style="width: 35px;">姓名</div>
            <div class="item-input-wrap" style="width: 100%">
              <input type="text" placeholder="请输入姓名" required validate>
              <span class="input-clear-button"></span>
            </div>

        </li>
        <li class="item-content item-input">
            <div class="item-title label person" style="width: 35px;">年龄</div>
            <div class="item-input-wrap">
              <input type="number" placeholder="请输入年龄">
              <span class="input-clear-button"></span>
            </div>
        </li>
        <li class="item-content item-input">
            <div class="item-title label person" style="width: 35px;">性别</div>
            <div class="item-input-wrap">
              <label class="label-switch" style="margin-left: 20px;">
                <input type="radio" checked value="1" name="idno">
                <div class="checkbox">男</div>
              </label>
              <label class="label-switch" style="margin-left: 20px">
                <input type="radio" value="2" name="idno">
                <div class="radio">女</div>
              </label>
            </div>
        </li>
        <li class="item-content item-input">
          <div class="item-title label person" style="width: 35px;">昵称</div>
          <div class="item-input-wrap" style="width: 100%">
            <input type="text" placeholder="请输入昵称">
            <span class="input-clear-button"></span>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-title label person" style="width: 35px;">生日</div>
          <div class="item-input-wrap" style="width: 100%">
            <input type="date" value="2014-04-30" placeholder="Please choose...">
          </div>
        </li>
        <li class="item-content  item-input">
          <div class="item-title label person" style="width: 78px;">身份证号码</div>
          <div class="item-input-wrap" style="width: 100%">
            <input type="text" placeholder="请输入身份证号码" required validate>
            <span class="input-clear-button"></span>
          </div>
        </li>
      </div>
      <p><a href="/center/" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">提交</a></p>
    </f7-list>
  </f7-page>
</template>
<script>

</script>
<style type="text/css">
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 12px;
  }
  .person {
    font-size: 12px !important;
  }
</style>
