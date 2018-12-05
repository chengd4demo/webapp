<!-- center Page Template -->
<template id="page-center">

  <f7-page>
    <f7-navbar class="header-title" title="个人信息设置" back-link="" style="background: #E94E24 !important;"></f7-navbar>
    <f7-list form>
      <div class="list-block">
        <ul>
          <li>
            <div class="item-content">
              <div class="item-title label" style="width: 50px">姓名:</div>
              <div class="item-inner">
                <div class="item-input">
                  <input type="text" placeholder="请输入姓名">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-title label" style="width: 50px">年龄:</div>
              <div class="item-inner">
                <div class="item-input">
                  <input type="text" placeholder="18">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-title label" style="width: 50px">性别:</div>
              <div class="item-inner">
                <div class="item-input">
                  <label class="label-switch" style="margin-left: 20px">
                    <input type="radio" value="1" name="as">
                    <div class="checkbox">男</div>
                  </label>
                  <label class="label-switch" style="margin-left: 20px">
                    <input type="radio" value="2" name="as">
                    <div class="radio">女</div>
                  </label>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-title label" style="width: 50px">昵称:</div>
              <div class="item-inner">
                <div class="item-input">
                  <input type="text" placeholder="昵称">
                </div>
              </div>
            </div>
          </li>
          <!-- Date -->
          <li>
            <div class="item-content">
              <div class="item-title label" style="width: 50px">生日:</div>
              <div class="item-inner">
                <div class="item-input">
                  <input type="date" placeholder="请选择日期" value="2014-04-30">
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="item-content">
              <div class="item-title label" style="width: 125px">身份证号码:</div>
              <div class="item-inner">
                <div class="item-input">
                  <input type="text" placeholder="请输入身份证号码">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p><a href="/center/" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">提交</a></p>
    </f7-list>
  </f7-page>
</template>
<script>

</script>
<style type="text/css">

</style>
