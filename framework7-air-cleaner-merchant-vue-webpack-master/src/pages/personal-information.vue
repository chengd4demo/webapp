<template>
  <f7-page>
    <f7-navbar title="个人信息设置" back-link="" style="background:#e94e24;"></f7-navbar>
    <f7-list form style="margin-top:1px">
      <f7-list-item>
        <f7-col>
          <p>昵称</p>
        </f7-col>
        <f7-col>
          <f7-input type="text" placeholder="请输入昵称"/>
        </f7-col>
      </f7-list-item>
      <f7-list-item>
        <f7-col>
          <p>微信号</p>
        </f7-col>
        <f7-col>
          <f7-input type="text" placeholder="请输入微信号"/>
        </f7-col>
      </f7-list-item>
      <f7-list-item>
        <f7-col>
          <p>身份证</p>
        </f7-col>
        <f7-col>
          <f7-input type="text" placeholder="请输入身份证号"/>
        </f7-col>
      </f7-list-item>
      <!--<f7-list-item>-->
        <!--<f7-col>-->
          <!--<p>头像</p>-->
        <!--</f7-col>-->
        <!--<f7-col>-->
          <!--<f7-input type="file"/>-->
        <!--</f7-col>-->
      <!--</f7-list-item>-->
      <p><a href="/home/" class="button button-fill" style="width:90%;margin:0 auto;background:#e94e24;">提交</a></p>
    </f7-list>
  </f7-page>
</template>

<script>
    export default {
        name: "personal-information"
    }

</script>

<style>
  .disabled{
    background-color: #ddd;
    border-color: #ddd;
    color:#57a3f3;
    cursor: not-allowed;
  }

</style>

