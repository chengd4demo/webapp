import cookie from '@/util/cookie'
const CommonUtils = {
    getAge(identityCard) {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 0;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 0;
            }
        }
        var strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    getSex(identityCard) {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 1;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 1;
            }
        }
        var gender = identityCard.slice(14, 17) % 2 ? "1" : "2"; // 1代表男性，2代表女性
        return gender === "1" ? 1 : 2
    },
    getBirthDay(idCard) {
        var birthday = "";  
        if (idCard != null && idCard != ""){  
            if(idCard.length == 15){  
                birthday = "19"+idCard.substr(6,6);  
            } else if(idCard.length == 18){  
                birthday = idCard.substr(6,8);  
            }  
            birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");  
        }  
        return birthday;
    },
    getQueryString(name) {  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]); return null;  
                
    },
   sleep(delay) {
     var start = (new Date()).getTime();
     while ((new Date()).getTime() - start < delay) {
       continue;
     }
   },
    localStorage:{
        getItem(key) {
            return window.localStorage.getItem(key) == null ? (cookie.get(key) == 'undefined' ? null :  cookie.get(key)) : window.localStorage.getItem(key)
          }, 
          setItem(key,value){
              window.localStorage.setItem(key,value)
              cookie.set(key,value,30)
          },
          removeItem(key) {
              window.localStorage.removeItem(key)
              cookie.clearCookie(key)
          }
    }
}

export default CommonUtils
