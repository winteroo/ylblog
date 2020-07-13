/**
 * editor上传图片
 * 支持多选上传
 * @author yangw 2020.07.09
 */

window.onload = function () {
  xrd_init();
}

var fileList = null;
var imageList = [];
var fileType = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
var token = sessionStorage.getItem('token');
var auth = sessionStorage.getItem('auth');


function xrd_init() {
  xrd_uploadfile();
  initEvent();
  xrd_initFileInput();
}

function xrd_uploadfile() {
  var typeStr = fileType.join('，');
  $('#acceptType').text('请上传' + typeStr + '格式的图片文件');
  $('#uploadBtn').click(function () {
    $('#fileUploadInput').click();
  });
}

function xrd_initFileInput() {
  // 设置上传文件的类型
  var acceptStr = '';
  for (var j = 0; j < fileType.length; j++) {
    acceptStr += ('image/' + fileType[j] + ',');
  }
  $('#fileUploadInput').attr('accept', acceptStr);
  // 文件变化处理
  $('#fileUploadInput').change(function (e) {
    var files = e.target.files;
    var flag = false;
    for (var i = 0; i < files.length; i++) {
      var type = files[i].type.split('/')[1];
      if (fileType.indexOf(type) === -1) {
        flag = true;
      } else {
        fileList = files[i];
        var dom = $('#imgContent');
        var item = {
          title: fileList.name,
          size: fileList.size,
          type: fileList.type,
          src: '',
          id: ''
        };
        uploadImgListNew(files[i], item, dom);
      }
    }
    if (flag) {
      $('#uploadResult').text('文件格式错误');
    } else {
      $('#uploadResult').text('');
    }
    // 删除
    $('#fileUploadInput').val('');
  });
}
// 上传图片数组
function uploadImgListNew(file, info, dom) {
  var files = file;
  var fd = new FormData();
  fd.append('files', files);
  fd.append('fileName', files.name);
  $.ajax({
    // url: '/jcms-c/pic/polling/upload',
    // url: '/myBase/pic/polling/upload',
    url: parent.uploadimgConfig.uploadPath,
    type: 'POST',
    dateType: 'json',
    headers: {
      'token': token,
      'auth': auth,
    },
    data: fd,
    processData: false, //重要
    contentType: false, //重要
    success: function (res) {
      if (res.errCode === 0) {
        info.src = res.data;
        info.id = new Date().getTime().toString();
        imageList.push(info);
        parent.uploadimgConfig.imgList = imageList;
        dom.append('<li class="img-item" style="display:none;" id=' + info.id + '><img src="./timg.jpg" class="delete-icon"><img src=' + res.data + ' width="100%" alt=""></li>');
        $('#' + info.id).slideDown();
      } else {
        dom.text(res.msg);
      }
    },
    error: function (err) {
      dom.text('上传失败');
    }
  });
}

function initEvent() {
  var ul = $('#imgContent');
  ul.click(function (event) {
    if (
      event.target.nodeName === 'IMG' &&
      event.target.className === 'delete-icon'
    ) {
      $(event.target).parent().slideUp('slow', function () {
        var liId = $(this).attr('id');
        removeItem(liId, imageList);

        $(this).remove();
      });
    }
  });
}

function removeItem(id, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      break;
    }
  }
}
