<!-- center Page Template -->
<template id="page-center">
   
    <f7-page>
      <f7-navbar class="header-title" title="设备列表" back-link="" style="background: #E94E24 !important;"></f7-navbar>
      <f7-list media-list class="no-margin-v">
        <ul class="no-border-v">
          <li>
            <a href="/info/" class="item-link">
              <div class="item-content-c">

                <a href="/monitor/"><div class="item-inner">
                  <div class="item-number">设备编号:3434534513412342</div>
                  <div class="item-title-row">
                    <div class="item-remainingTime">剩余时长:3小时</div>
                  </div>
                   <div class="item-span"><span>正在使用</span></div>
                </div></a>
              </div>
              <div class="item-content-c">

                <a href="/monitor/"><div class="item-inner">
                  <div class="item-number">设备编号:3434534513412342</div>
                  <div class="item-title-row">
                    <div class="item-remainingTime">剩余时长:3小时</div>
                  </div>
                  <div class="item-span-1"><span>未使用</span></div>
                </div></a>
              </div>
            </a>
          </li>
        </ul>

      </f7-list >
    </f7-page>
</template>
<script>

</script>
<style type="text/css">
.item-number{
  color: black;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
}
.item-remainingTime{
  margin-top: 5px;
  margin-left: 5px;
  font-size: 10px;
  color: #BFBFBF;
}
.item-span{
  margin-top: 5px;
  margin-left: 5px;
}
.item-span span{
  color: white;
  font-size: 12px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 4px 4px 4px 4px;
  background: #43CF7C;
}
.item-span-1{
  margin-top: 5px;
  margin-left: 5px;
}
  .item-span-1 span{
    color: white;
    font-size: 12px;
    text-align: center;
    padding: 2px 3px;
    border-radius: 4px 4px 4px 4px;
    background: #FF8D1A;
  }
</style>
