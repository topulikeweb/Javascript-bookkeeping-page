/**
 * @Description: 判断点击时用户是否正确输入
 * @author topu
 * @date 2022/8/12
 */
let income = 0;
let expenditure = 0;
const record = [];
//点击添加消费
window.$(function () {
  $('#add').on('click', function () {
    if ($('#name').val() === '' && $('#money').val() === '') {
      alert('你输入错了哦')
    } else {
      //判断第一个符号是否为正
      let type = $('#money').val().slice(0, 1);
      let color = type === '+' ? 'skyblue' : 'tomato';
      const str = `
        <li id="li" style="border-right: 4px solid ${color};">
                <span class="name">${$("#name").val()}</span>
                <span class="money" style="color:${color};">${$("#money").val()}</span>
                <span class="del">X</span>
        </li> `
      //将str添加到ul的最后面生成，然后找到.del,给删除绑定事件
      $(str).appendTo($('#ul')).find('.del').on('click', function () {
        let obj = JSON.parse(localStorage.record);
        //判断money类里面是否有+
        if ($(this).pre().html().includes("+")) {
          //如果删除的是收入
          let m = $(this).prev().html().slice(1);//获取.money的值
          income = income - m;
          $('.income').html(income);
        } else {
          let n = $(this).prev().html().slice(1);
          expenditure = expenditure - n;
          $('.expenditure').html(expenditure);
        }
        $('.balance_money').html(income - expenditure);
        //更新本地储存的数据
        obj.income = income;
        obj.expenditure = expenditure;
        // 删除对应的数据
        let index = $('#li').index($(this).parent());//在所有含有#li标签的盒子中返回你点击的x的li的索引
        obj.list.splice(index, 1);
        localStorage.record = JSON.stringify(obj);
        $(this).parent().remove();
        
      })
    }
  })
})