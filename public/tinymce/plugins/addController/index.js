// 获取控件类型数组
var controllList = JSON.parse(localStorage.getItem('controlltype'));
// 控件类型选择框
var controllTypeSelectDom = document.getElementById('controllType');
// 控件名称一整行
var controllNameConDom = document.getElementById('controllNameCon');
// 控件名称输入框
var controllNameDom = document.getElementById('controllName');
// 错误dom
var errorDom = document.getElementById('error');

window.onload = function () {
  // 设置下拉框内容
  setOptions(controllTypeSelectDom, controllList);
  initConfig(controllList);
  if (parent.controllerConfig.actionType === 'edit') {
    setSelectChecked();
  }
  changeControllType(true);
}

// 设置当编辑状态进入时，设置当前选中的元素
function setSelectChecked() {
  // 获取待编辑的元素
  var editDom = parent.controllerConfig.editDom;
  // 输入框元素
  var inputDom = editDom.firstElementChild;
  var editor = parent.tinymce.activeEditor;
  // 控件key值
  var tagId =  editor.dom.getAttrib(inputDom,'tag-id');
  var controllName = editor.dom.getAttrib(inputDom, 'value');
  var dicType = editor.dom.getAttrib(inputDom, 'dic-type');
  if (dicType !== '2') {
    controllTypeSelectDom.value = tagId;
  } else {
    controllTypeSelectDom.value = 'auto';
    controllNameDom.value = controllName;
  }
}
// 设置下拉框的选项
function setOptions(parentNode, list) {
  for (var idx in list) {
    if (idx !== 'find') {
      var option = document.createElement("option");
      option.value = list[idx].tagId;
      option.innerHTML = list[idx].label;
      parentNode.appendChild(option);
    }
  }
}
// 验证输入框
function checkInput() {
  if (controllNameDom.value.trim() === '') {
    controllNameDom.style.border = '1px solid red';
    errorDom.innerHTML = '控件名称为必填项！'
    errorDom.style.display = 'block';
    setFlag(false);
  } else if (controllNameDom.value.length >= 30) {
    controllNameDom.style.border = '1px solid red';
    errorDom.innerHTML = '控件名称不能大于30个字！'
    errorDom.style.display = 'block';
    setFlag(false);
  } else {
    controllNameDom.style.border = '1px solid #DCDFE6';
    errorDom.style.display = 'none';
    setFlag(true);
  }
  setControllerConfig(null, controllNameDom.value);
}
/**
 * 设置是否可以通过验证的标志 
 * @param {boolean} flag 当前标志  true：通过  false：不通过 
 */
function setFlag(flag) {
  parent.controllerConfig.flag = flag;
}
/**
 * 初始化挂载在window上的对象，便于插件读取
 * @param {Array} controllList 控件列表
 */
function initConfig(controllList) {
  // 获取editor实例
  var editor = parent.tinymce.activeEditor;
  var cloneConfig = parent.controllerConfig;
  // 获取公共变量
  // 初始化为不通过
  cloneConfig.flag = false;
  // 传递检查输入框内容的函数
  cloneConfig.checkInput = checkInput;
 // 控件列表
  cloneConfig.controllerList = controllList;
  // 选中的下拉框对象即控件对象
  cloneConfig.controllerType = null;
  // 自主命名的控件名称
  cloneConfig.autoControllerName = '';
}
/**
 * 设置下拉选择框选中项和自主控件名称
 * @param {*} controllerType 
 * @param {*} autoControllerName 
 */
function setControllerConfig(controllerType, autoControllerName) {
  if (controllerType !== null) {
    parent.controllerConfig.controllerType = controllerType;
  }
  if (autoControllerName) {
    parent.controllerConfig.autoControllerName = autoControllerName;
  }
}
// 下拉框选择变化事件
function changeControllType(flag) {
  var index = controllTypeSelectDom.selectedIndex; // 选中索引
  var value = controllTypeSelectDom.options[index].value; // 选中值
  var name = controllTypeSelectDom.options[index].innerHTML; // 选中名称
  controllNameDom.style.border = '1px solid #DCDFE6';
  errorDom.style.display = 'none';
  if (value !== 'auto') {
    controllNameDom.value = value;
    controllNameDom.setAttribute('disabled', 'disabled');
    controllNameDom.style.backgroundColor = '#ccc';
    controllNameConDom.style.display = 'none';
    setFlag(true);
  } else {
    if (!flag) {
      controllNameDom.value = '';
    }
    controllNameDom.removeAttribute('disabled');
    controllNameDom.style.backgroundColor = '#fff';
    controllNameConDom.style.display = 'block';
    setFlag(false);
  }
  setControllerConfig(value);
}
