/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

Vcity.allCity = ['北京市|beijing|bj','上海市|shanghai|sh','广州市|guangzhou|gz','深圳市|shenzhen|sz','南京市|nanjing|nj','杭州市|hangzhou|hz','天津市|tianjin|tj','重庆市|chongqing|cq','成都市|chengdu|cd','青岛市|qingdao|qd','苏州市|shuzhou|sz','无锡市|wuxi|wx','常州市|changzhou|cz','温州市|wenzhou|wz','武汉市|wuhan|wh','长沙市|changsha|cs','石家庄市|shijiazhuang|sjz','南昌市|nanchang|nc','三亚市|sanya|sy','合肥市|hefei|hf','郑州市|zhengzhou|zz','保定市|baoding|bd','唐山市|tangshan|ts','秦皇岛市|qinhuangdao|qhd','邯郸市|handan|hd','邢台市|xingtai|xt','张家口市|zhangjiakou|zjk','承德市|chengde|cd','衡水市|hengshui|hs','廊坊市|langfang|lf','沧州市|cangzhou|cz','太原市|taiyuan|ty','大同市|datong|dt','阳泉市|yangquan|yq','长治市|changzhi|cz','晋城市|jincheng|jc','朔州市|shuozhou|sz','晋中市|jinzhong|jz','运城市|yuncheng|yc','忻州市|xinzhou|xz','临汾市|linfen|lf','吕梁市|lvliang|ll','呼和浩特市|huhehaote|hhht','包头市|baotou|bt','乌海市|wuhai|wh','赤峰市|chifeng|cf','通辽市|tongliao|tl','鄂尔多斯市|eerduosi|eeds','呼伦贝尔市|hulunbeier|hlbe','巴彦淖尔市|bayannaoer|byne','乌兰察布市|wulanchabu|wlcb','兴安盟|xinganmeng|xam','锡林郭勒盟|xilinguolemeng|xlglm','阿拉善盟|alashanmeng|alsm','沈阳市|shenyang|sy','大连市|dalian|dl','鞍山市|anshan|as','抚顺市|fushun|fs','本溪市|benxi|bx','丹东市|dandong|dd','锦州市|jinzhou|jz','营口市|yingkou|yk','阜新市|fuxin|fx','辽阳市|liaoyang|ly','盘锦市|panjin|pj','铁岭市|tieling|tl','朝阳市|chaoyang|cy','葫芦岛市|huludao|hld','长春市|changchun|cc','吉林市|jilin|jl','四平市|siping|sp','辽源市|liaoyuan|ly','通化市|tonghua|th','白山市|baishan|bs','松原市|songyuan|sy','白城市|baicheng|bc','延边朝鲜族自治州|ybcxzzzz|ybcxzzzz','哈尔滨市|haerbin|heb','齐齐哈尔市|qiqihaer|qqhe','鸡西市|jixi|jx','鹤岗市|hegang|hg','双鸭山市|shuangyashan|sys','大庆市|daqing|dq','伊春市|yichun|yc','佳木斯市|jiamusi|jms','七台河市|qitaihe|qth','牡丹江市|mudanjiang|mdj','黑河市|heihe|hh','绥化市|suihua|sh','大兴安岭地区|daxinganling|dxaldq','徐州市|xuzhou|xz','南通市|nantong|nt','连云港市|lianyungang|lyg','淮安市|huaian|ha','盐城市|yancheng|yc','扬州市|yangzhou|yz','镇江市|zhenjiang|zj','泰州市|taizhou|tz','宿迁市|suqian|sq','宁波市|ningbo|nb','嘉兴市|jiaxing|jx','湖州市|huzhou|hz','绍兴市|shaoxing|sx','舟山市|zhoushan|zs','衢州市|quzhou|qz','金华市|jinhua|jh','台州市|taizhou|tz','丽水市|lishui|ls','芜湖市|wuhu|wh','蚌埠市|bengbu|bb','淮南市|huainan|hn','马鞍山市|maanshan|mas','淮北市|huaibei|hb','铜陵市|tongling|tl','安庆市|anqing|aq','黄山市|huangshan|hs','滁州市|chuzhou|cz','阜阳市|fuyang|fy','宿州市|suzhou|sz','巢湖市|chaohu|ch','六安市|luan|la','亳州市|bozhou|bz','池州市|chizhou|cz','宣城市|xuancheng|xc','福州市|fuzhou|fz','厦门市|xiamen|xm','莆田市|putian|pt','三明市|sanming|sm','泉州市|quanzhou|qz','漳州市|zhangzhou|zz','南平市|nanping|np','龙岩市|longyan|ly','宁德市|ningde|nd','景德镇市|jingdezhen|jdz','萍乡市|pingxiang|px','九江市|jiujiang|jj','新余市|xinyu|xy','鹰潭市|yingtan|yt','赣州市|ganzhou|gz','吉安市|jian|ja','宜春市|yichun|yc','抚州市|fuzhou|fz','上饶市|shangrao|sr','济南市|jinan|jn','淄博市|zibo|zb','枣庄市|zaozhuang|zz','东营市|dongying|dy','烟台市|yantai|yt','潍坊市|weifang|wf','济宁市|jining|jn','泰安市|taian|ta','威海市|weihai|wh','日照市|rizhao|rz','莱芜市|laiwu|lw','临沂市|linyi|ly','德州市|dezhou|dz','聊城市|liaocheng|lc','滨州市|binzhou|bz','菏泽市|heze|hz','开封市|kaifeng|kf','洛阳市|luoyang|ly','平顶山市|pingdingshan|pds','安阳市|anyang|ay','鹤壁市|hebi|hb','新乡市|xinxiang|xx','焦作市|jiaozuo|jz','濮阳市|puyang|py','许昌市|xuchang|xc','漯河市|luohe|lh','三门峡市|sanmenxia|smx','南阳市|nanyang|ny','商丘市|shangqiu|sq','信阳市|xinyang|xy','周口市|zhoukou|zk','驻马店市|zhumadian|zmd','济源市|jiyuan|jiyuan','黄石市|huangshi|hs','十堰市|shiyan|sy','宜昌市|yichang|yc','襄樊市|xiangfan|xf','鄂州市|ezhou|ez','荆门市|jingmen|jm','孝感市|xiaogan|xg','荆州市|jingzhou|jz','黄冈市|huanggang|hg','咸宁市|xianning|xn','随州市|suizhou|sz','恩施土家族苗族自治州|estjzmzzzz|estjzmzzzz','仙桃市|xiantao|xt','潜江市|qianjiang|qj','天门市|tianmen|tm','神农架林区|shennongjia|snjlq','株洲市|zhuzhou|zz','湘潭市|xiangtan|xt','衡阳市|hengyang|hy','邵阳市|shaoyang|sy','岳阳市|yueyang|yy','常德市|changde|cd','张家界市|zhangjiajie|zjj','益阳市|yiyang|yy','郴州市|chenzhou|cz','永州市|yongzhou|yz','怀化市|huaihua|hh','娄底市|loudi|ld','湘西土家族苗族自治州|xxtjzmzzzz|xxtjzmzzzz','韶关市|shaoguan|sg','珠海市|zhuhai|zh','汕头市|shantou|st','佛山市|foushan|fs','江门市|jiangmen|jm','湛江市|zhanjiang|jz','茂名市|maoming|mm','肇庆市|zhaoqing|zq','惠州市|huizhou|hz','梅州市|meizhou|mz','汕尾市|shanwei|sw','河源市|heyuan|hy','阳江市|yangjiang|yj','清远市|qingyuan|qy','东莞市|dongguan|dg','中山市|zhongshan|zs','潮州市|chaozhou|cz','揭阳市|jieyang|jy','云浮市|yunfu|yf','南宁市|nanning|nn','柳州市|liuzhou|lz','桂林市|guilin|gl','梧州市|wuzhou|wz','北海市|beihai|bh','防城港市|fangchenggang|fcg','钦州市|qinzhou|qz','贵港市|guigang|gg','玉林市|yulin|yl','百色市|baise|bs','贺州市|hezhou|hz','河池市|hechi|hc','来宾市|laibin|lb','崇左市|chongzuo|cz','海口市|haikou|hk','三亚市|sanya|sy','五指山市|wuzhishan|wzs','琼海市|qionghai|qh','儋州市|danzhou|dz','文昌市|wenchang|wc','万宁市|wanning|wn','东方市|dongfang|df','定安县|dingan|da','屯昌县|tunchang|tc','澄迈县|chengmai|cm','临高县|lingao|lg','白沙黎族自治县|bsnzzzx|bsnzzzx','昌江黎族自治县|cjlzzzx|cjlzzzx','乐东黎族自治县|ldlzzzx|ldlzzzx','陵水黎族自治县|lingshui|ls','保亭黎族苗族自治县|btlzmzzzx|btlzmzzzx','琼中黎族苗族自治县|qzlzmzzzx|qzlzmzzzx','西沙群岛|xishaqundao|xsqd','南沙群岛|nanshaqundao|nsqd','中沙群岛的岛礁及其海域|zhongshaqundao|zsqd','自贡市|zigong|zg','攀枝花市|panzhihua|pzh','泸州市|luzhou|lz','德阳市|deyang|dy','绵阳市|mianyang|my','广元市|guangyuan|gy','遂宁市|suining|sn','内江市|neijiang|nj','乐山市|leshan|ls','南充市|nanchong|nc','眉山市|meishan|ms','宜宾市|yibin|yb','广安市|guangan|ga','达州市|dazhou|dz','雅安市|yaan|ya','巴中市|bazhong|bz','资阳市|ziyang|zy','阿坝藏族羌族自治州|abzzqzzzz|abzzqzzzz','甘孜藏族自治州|gzzzzzz|gzzzzzz','凉山彝族自治州|lsyzzzz|lsyzzzz','贵阳市|guiyang|gy','六盘水市|liupanshui|lps','遵义市|zunyi|zy','安顺市|anshun|as','铜仁地区|tongren|tr','黔西南布依族苗族自治州|qxnbyzmzzzz|qxnbyzmzzzz','毕节地区|bijie|bj','黔东南苗族侗族自治州|qdnmzdzzzz|qdnmzdzzzz','黔南布依族苗族自治州|qnbyzmzzzz|qnbyzmzzzz','昆明市|kunming|km','曲靖市|qujing|qj','玉溪市|yuxi|yx','保山市|baoshan|bs','昭通市|zhaotong|zt','丽江市|lijiang|lj','思茅市|simao|sm','临沧市|lincang|lc','楚雄彝族自治州|cxyzzzz|cxyzzzz','红河哈尼族彝族自治州|hhhnzyzzzz|hhhnzyzzzz','文山壮族苗族自治州|wszzmzzzz|wszzmzzzz','西双版纳傣族自治州|xsbndzzzz|xsbndzzzz','大理白族自治州|dlbzzzz|dlbzzzz','德宏傣族景颇族自治州|dhdzjpzzzz|dhdzjpzzzz','怒江傈僳族自治州|njlszzzz|njlszzzz','迪庆藏族自治州|dqzzzzz|dqzzzzz','拉萨市|lasa|ls','昌都地区|changdudiqu|cd','山南地区|shannandiqu|sndq','日喀则地区|rikazediqu|rkzdq','那曲地区|naqudiqu|nqdq','阿里地区|alidiqu|aldq','林芝地区|linzhidiqu|lzdq','西安市|xian|xa','铜川市|tongchuan|tc','宝鸡市|baoji|bj','咸阳市|xianyang|xy','渭南市|weinan|wn','延安市|yanan|ya','汉中市|hanzhong|hz','榆林市|yulin|yl','安康市|ankang|ak','商洛市|shangluo|sl','兰州市|lanzhou|lz','嘉峪关市|jiayuguan|jyg','金昌市|jinchang|jc','白银市|baiyin|by','天水市|tianshui|ts','武威市|wuwei|ww','张掖市|zhangye|zy','平凉市|pingliang|pl','酒泉市|jiuquan|jq','庆阳市|qingyang|qy','定西市|dingxi|dx','陇南市|longnan|ln','临夏回族自治州|lxhzzzz|lxhzzzz','甘南藏族自治州|gnzzzzz|gnzzzzz','西宁市|xining|xn','海东地区|haidongdiqu|hddq','海北藏族自治州|hbzzzzz|hbzzzzz','黄南藏族自治州|hnzzzzz|hnzzzzz','海南藏族自治州|hnzzzzz|hnzzzzz','果洛藏族自治州|glzzzzz|hlzzzzz','玉树藏族自治州|yszzzzz|yszzzzz','海西蒙古族藏族自治州|hxmgzzzzzz|hxmgzzzzzz','银川市|yinchuan|yc','石嘴山市|shizuishan|szs','吴忠市|wuzhong|wz','固原市|guyuan|gy','中卫市|zhongwei|zw','乌鲁木齐市|wulumuqi|wlmq','克拉玛依市|kelamayi|klmy','吐鲁番地区|tulufandiqu|tlfdq','哈密地区|hamidiqu|hmdq','昌吉回族自治州|cjhzzzz|cjhzzzz','博尔塔拉蒙古自治州|betlmgzzz|betlmgzzz','巴音郭楞蒙古自治州|byglmgzzz|byglmgzzz','阿克苏地区|akesudiqu|aksdq','克孜勒苏柯尔克孜自治州|kzlskekzzzz|kzlskekzzzz','喀什地区|kashidiqu|ksdq','和田地区|hetian|ht','伊犁哈萨克自治州|ylhskzzz|ylhskzzz','塔城地区|tachengdiqu|tcdq','阿勒泰地区|aletaidiqu|altdq','石河子市|shihezi|shz','阿拉尔市|alaer|ale','图木舒克市|tumushuke|tmsk','五家渠市|wujiaqu|wjq','台北市|taibei|tb','高雄市|gaoxiong|gx','基隆市|jilong|jl','台中市|taizhong|tz','台南市|tainan|tn','新竹市|xinzhu|xz','嘉义市|jiayi|jy','台北县|taibeixian|tbx','宜兰县|yilanxian|ylx','桃园县|taoyuanxian|tyx','新竹县|xinzhuxian|xzx','苗栗县|miaolixian|mlx','台中县|taizhongxian|tzx','彰化县|zhanghuaxian|zhx','南投县|nantouxian|ntx','云林县|yunlinxian|ylx','嘉义县|jiayixian|jyx','台南县|tainanxian|tnx','高雄县|gaoxiongxian|gxx','屏东县|pingdongxian|pdx','澎湖县|penghuxian|phx','台东县|taidongxian|tdx','花莲县|hualianxian|hlx','中西区|zhongxiqu|zxq','东区|dongqu|dq','九龙城区|jiulongchengqu|jlcq','观塘区|guantangqu|gtq','南区|nanqu|nq','深水埗区|shenshuibuqu|ssbq','黄大仙区|huangdaxianqu|hdxq','湾仔区|wanzaiqu|wzq','油尖旺区|youjianwangqu|yjwq','离岛区|lidaoqu|ldq','葵青区|kuiqingqu|kqq','北区|beiqu|bq','西贡区|xigongqu|xgq','沙田区|shatianqu|stq','屯门区|tunmenqu|tmq','大埔区|dabuqu|dbq','荃湾区|quanwanqu|qwq','元朗区|yuanlangqu|ylq','花地玛堂区|huadimatangqu|hdmtq','圣安多尼堂区|shenganduonitangqu|sadntq','大堂区|datangqu|dtq','望德堂区|wangdetangqu|wdtq','风顺堂区|fengshuntangqu|fstq','嘉模堂区|jiamotangqu|jmtq','圣方济各堂区|shengfangjigetangqu|sfjgtq'];


/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
    var citys = Vcity.allCity, match, letter,
            regEx = Vcity.regEx,
            reg2 = /^[a-b]$/i, reg3 = /^[c-d]$/i, reg4 = /^[e-g]$/i,reg5 = /^[h]$/i,reg6 = /^[j]$/i,reg7 = /^[k-l]$/i,reg8 =  /^[m-p]$/i,reg9 =  /^[q-r]$/i,reg10 =  /^[s]$/i,reg11 =  /^[t]$/i,reg12 =  /^[w]$/i,reg13 =  /^[x]$/i,reg14 =  /^[y]$/i,reg15 =  /^[z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},AB:{},CD:{},EFG:{},H:{},J:{},KL:{},MNP:{},QR:{},S:{},T:{},W:{},X:{},Y:{},Z:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.AB[letter]) Vcity.oCity.AB[letter] = [];
                Vcity.oCity.AB[letter].push(match[1]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.CD[letter]) Vcity.oCity.CD[letter] = [];
                Vcity.oCity.CD[letter].push(match[1]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.EFG[letter]) Vcity.oCity.EFG[letter] = [];
                Vcity.oCity.EFG[letter].push(match[1]);
            }else if (reg5.test(letter)) {
                if (!Vcity.oCity.H[letter]) Vcity.oCity.H[letter] = [];
                Vcity.oCity.H[letter].push(match[1]);
            }else if (reg6.test(letter)) {
                if (!Vcity.oCity.J[letter]) Vcity.oCity.J[letter] = [];
                Vcity.oCity.J[letter].push(match[1]);
            }else if (reg7.test(letter)) {
                if (!Vcity.oCity.KL[letter]) Vcity.oCity.KL[letter] = [];
                Vcity.oCity.KL[letter].push(match[1]);
            }else if (reg8.test(letter)) {
                if (!Vcity.oCity.MNP[letter]) Vcity.oCity.MNP[letter] = [];
                Vcity.oCity.MNP[letter].push(match[1]);
            }else if (reg9.test(letter)) {
                if (!Vcity.oCity.QR[letter]) Vcity.oCity.QR[letter] = [];
                Vcity.oCity.QR[letter].push(match[1]);
            }else if (reg10.test(letter)) {
                if (!Vcity.oCity.S[letter]) Vcity.oCity.S[letter] = [];
                Vcity.oCity.S[letter].push(match[1]);
            }else if (reg11.test(letter)) {
                if (!Vcity.oCity.T[letter]) Vcity.oCity.T[letter] = [];
                Vcity.oCity.T[letter].push(match[1]);
            }else if (reg12.test(letter)) {
                if (!Vcity.oCity.W[letter]) Vcity.oCity.W[letter] = [];
                Vcity.oCity.W[letter].push(match[1]);
            }else if (reg13.test(letter)) {
                if (!Vcity.oCity.X[letter]) Vcity.oCity.X[letter] = [];
                Vcity.oCity.X[letter].push(match[1]);
            }else if (reg14.test(letter)) {
                if (!Vcity.oCity.Y[letter]) Vcity.oCity.Y[letter] = [];
                Vcity.oCity.Y[letter].push(match[1]);
            }else if (reg15.test(letter)) {
                if (!Vcity.oCity.Z[letter]) Vcity.oCity.Z[letter] = [];
                Vcity.oCity.Z[letter].push(match[1]);
            }

            /* 热门城市 前16条 */
            if(i<20){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(match[1]);
            }
        }
    }
})();


/* 城市HTML模板 */
Vcity._template = [
    '<ul>',
    '<li class="on">热门城市</li>',
    '<li>AB</li>',
    '<li>CD</li>',
    '<li>EFG</li>',
    '<li>H</li>',
    '<li>J</li>',
    '<li>KL</li>',
    '<li>MNP</li>',
    '<li>QR</li>',
    '<li>S</li>',
    '<li>T</li>',
    '<li>W</li>',
    '<li>X</li>',
    '<li>Y</li>',
    '<li>Z</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var button = options.button;
        this.button = Vcity._m.$('#'+ button);
        this.buttonEvent();
    },

    /* *
        

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var buttonPos = Vcity._m.getPos(this.button);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.button) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = buttonPos.left + 'px';
        div.style.top = buttonPos.bottom + 5 + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a href="#">' + oCity[key][sortKey[j]][i] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var date = new Date;
        var houses;
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        var current_city;

        
        function city_index(city){
            if(city.name == current_city){
                return city;
            }
        };

        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.button.innerHTML = this.innerHTML;
                current_city = this.innerHTML;
                
                $(".load").remove();
                if (current_city != null) {
                    var districts = citylist[citylist.findIndex(city_index)].district.length;
                    for (var n = 0; n < districts; n++) {
                        $(".select1 .select-all").after('<dd class="load"><a href="#">'+citylist[citylist.findIndex(city_index)].district[n]+'</a></dd>');
                    }
                }

                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);

                $(document).ready(function(){
                    $("#select1 dd").click(function () {
                        $(this).addClass("selected").siblings().removeClass("selected");
                        if ($(this).hasClass("select-all")) {
                            $("#selectA").remove();
                        } else {
                            var copyThisA = $(this).clone();
                            if ($("#selectA").length > 0) {
                                $("#selectA a").html($(this).text());
                            } else {
                                $(".select-result dl").append(copyThisA.attr("id", "selectA"));
                            }
                        }
                    });
                });

                var region_price = new Array(12);
                $.ajax({
                    type: "post",
                    url: "/query_prices",
                    datatype:"json",
                    data: {
                        "city": current_city,
                        "month": getMonth()+1,
                        "min": 0,
                        "max": 10000000,
                        'page':1
                    },
                    async: false,
                    error: function(request) {
                        alert("Connection error");
                    },
                    success(data){
                        region_price[0]=data.one;
                        region_price[1]=data.two;
                        region_price[2]=data.three;
                        region_price[3]=data.four;
                        region_price[4]=data.five;
                        region_price[5]=data.six;
                        region_price[6]=data.seven;
                        region_price[7]=data.eight;
                        region_price[8]=data.nine;
                        region_price[9]=data.ten;
                        region_price[10]=data.eleven;
                        region_price[11]=data.twelve;
                        $(document).ready(function(){
                            for(var i=0; i<20; i++){
                                $(".house_title").eq(i).html(data.houses[i].firm_name);
                                $(".address").eq(i).html(data.houses[i].address);
                                $(".house_type").eq(i).html(data.houses[i].house_type);
                                $(".ave_price").eq(i).html(data.houses[i].average_price);
                                $(".total_price").eq(i).html(data.houses[i].total_price);
                                $(".area").eq(i).html(data.houses[i].area);
                            }
                            $("#Pagination").pagination(data.page_num);
                            $("#allPage").html(data.page_num);
                        });
                        }
                });
                $("#lineChartExample4").remove();
                $("#line_chart").append('<canvas id="lineChartExample4"></canvas>');
                $(document).ready(function () {
                    'use strict';
                var LINECHART4 = $('#lineChartExample4');
                var myLineChart4 = new Chart(LINECHART4, {
                    type: 'line',
                    options: {
                        scales: {
                            xAxes: [{
                                display: true,
                                gridLines: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                display:true,
                                gridLines: {
                                    display: true
                                }
                            }]
                        },
                        legend: {labels:{fontColor:"#777", fontSize: 12},display:false}
                    },
                    data: {
                        labels: [lastYear(getMonth()-11), lastYear(getMonth()-10), lastYear(getMonth()-9), lastYear(getMonth()-8), lastYear(getMonth()-7), lastYear(getMonth()-6), lastYear(getMonth()-5), lastYear(getMonth()-4), lastYear(getMonth()-3), lastYear(getMonth()-2), lastYear(getMonth()-1), lastYear(getMonth())],
                        datasets: [
                            {
                                label: "City 1",
                                fill: true,
                                lineTension: 0,
                                backgroundColor: "transparent",
                                borderColor: '#6ccef0',
                                pointBorderColor: '#59c2e6',
                                pointHoverBackgroundColor: '#59c2e6',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                borderWidth: 3,
                                pointBackgroundColor: "#59c2e6",
                                pointBorderWidth: 0,
                                pointHoverRadius: 4,
                                pointHoverBorderColor: "#fff",
                                pointHoverBorderWidth: 0,
                                pointRadius: 4,
                                pointHitRadius: 0,
                                data: [region_price[0], region_price[1], region_price[2], region_price[3], region_price[4], region_price[5], region_price[6], region_price[7], region_price[8], region_price[9], region_price[10], region_price[11]],
                                spanGaps: false
                            }
                        ]
                    }
                });
                });
            }
        }
    },

    /* *
     * button城市输入框事件
     * @buttonEvent
     * */

    buttonEvent:function(){
        var that = this;
        Vcity._m.on(this.button,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        // Vcity._m.on(this.button,'focus',function(){
        //     that.button.select();
        //     if(that.button.value == '城市名') that.button.value = '';
        // });
        Vcity._m.on(this.button,'blur',function(){
            // if(that.button.value == '') that.button.value = '城市名';
            
            var value = Vcity._m.trim(that.button.value);
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
                var flag=0;
                for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                    if (reg.test(Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    that.button.value= '';
                }else{
                    var lis = Vcity._m.$('li',that.ul);
                    if(typeof lis == 'object' && lis['length'] > 0){
                        var li = lis[0];
                        var bs = li.children;
                        if(bs && bs['length'] > 1){
                            that.button.value = bs[0].innerHTML;
                        }
                    }else{
                        that.button.value = '';
                    }
                }
            }

        });
        Vcity._m.on(this.button,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    }

};