
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
    getPm25Grade(pm25) {
      var result = {}
      if (0 <= pm25 && pm25<=50) {
        result.pm25Val = '优'
        result.pmMsg = '可多参加户外活动呼吸新鲜空气'
      } else if (51 <= pm25 && pm25<=100) {
        result.pm25Val = '良'
        result.pmMsg = '除少数对某些污染物特别容易过敏的人群外，其他人群可以正常进行室外活动。'
      } else if (101 <= pm25 && pm25<=150) {
        result.pm25Val = '轻度污染'
        result.pmMsg = '敏感人群需减少体力消耗较大的户外活动'
      } else if (151 <= pm25 && pm25<=200) {
        result.pm25Val = '中度污染'
        result.pmMsg = '敏感人群应尽量减少外出，一般人群适当减少户外运动'
      } else if (201 <= pm25 && pm25<=300) {
        result.pm25Val = '重度污染'
        result.pmMsg = '敏感人群应停止户外运动，一般人群尽量减少户外运动'
      } else if(pm25 > 300) {
        result.pm25Val = '严重污染'
        result.pmMsg = '除有特殊需要的人群外，尽量不要留在室外'
      }
      return result;
    }
}

export default CommonUtils
