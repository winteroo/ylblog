<template>
  <div>
    <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
      <textarea :id="tinymceId" class="tinymce-textarea" />
    </div>
    <div class="editor-msg">
      <div class="title">获取的内容：</div>
      <div class="editor-con">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
const tinymceCDN = process.env.NODE_ENV === 'production' ? '/ylblog/tinymce/tinymce.min.js' : '/tinymce/tinymce.min.js';
const plugins = ['print powerpaste preview searchreplace autolink quickbars directionality visualblocks visualchars fullpage fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists imagetools wordcount textpattern help emoticons autosave   autoresize indent2em autoresize lineheight  axupimgs addController uploadimg'];
const toolbar = ['code undo redo restoredraft cut copy paste pastetext  forecolor backcolor bold italic underline strikethrough link anchor   alignleft aligncenter alignright alignjustify outdent indent  styleselect formatselect fontselect  fontsizeselect  bullist numlist   blockquote subscript superscript removeformat  table image media  charmap emoticons hr pagebreak insertdatetime  print preview  fullscreen  indent2em lineheight searchreplace uploadimg addController'];
export default {
  name: 'TinymceEditor',
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return [];
      }
    },
    menubar: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      required: false,
      default: 400
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data () {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      msg: '',
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    };
  },
  computed: {
    containerWidth () {
      const width = this.width;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    }
  },
  mounted () {
    this.getControllList();
    this.init();
  },
  activated () {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated () {
    this.destroyTinymce();
  },
  destroyed () {
    this.destroyTinymce();
  },
  methods: {
    init () {
      // dynamic load tinymce from cdn
      import('./utils/loadScript.js').then(module => {
        let load = module.default;
        load(tinymceCDN, (err) => {
          if (err) {
            this.$message.error(err.message);
            return;
          }
          this.initTinymce();
        });
      });
    },
    initTinymce () {
      const _this = this;
      let contextmenu = 'image imagetools table configurepermanentpen addController';
      let editorToolbar = this.toolbar.length > 0 ? this.toolbar : toolbar;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        min_height: this.height,
        extended_valid_elements: 'input[dic-id|dic-type|tag-id|value|style|class|id|type|readonly|disabled],span[id|dic-id]',
        menu: {
          file: { title: 'File', items: 'newdocument restoredraft  ' },
          edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
          view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
          insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
          format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
          tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
          table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
          help: { title: 'Help', items: 'help' }
        },
        body_class: 'panel-body',
        // 可拖动模态框
        draggable_modal: true,
        // 工具栏
        toolbar: editorToolbar,
        // 菜单栏
        menubar: this.menubar,
        // 插件
        plugins: plugins,
        // 控制右键菜单项
        contextmenu: contextmenu,
        // 字体大小列表
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        // 字体样式列表
        font_formats: `黑体=SimHei,sans-serif;楷体=KaiTi,serif;微软雅黑=Microsoft YaHei,sans-serif;仿宋体=FangSong,serif;Arial=arial,helvetica,sans-serif;`,
        // 在新标签页中打开链接
        default_link_target: '_blank',
        // 隐藏右下角文字
        branding: false,
        // 隐藏底栏的元素路径
        elementpath: false,
        // 移除编辑器下拉菜单中的某项
        removed_menuitems: '',
        // 工具栏模式
        toolbar_mode: 'sliding',
        // 粘性工具栏
        toolbar_sticky: true,
        // 设置editor默认字体，需要开启fullpage插件
        fullpage_default_font_family: 'SimHei,sans-serif;',
        // 隐藏底部状态栏
        statusbar: false,
        // powerPaste插件配置
        powerpaste_word_import: 'clean', // 参数可以是propmt, merge, clear，效果自行切换对比
        powerpaste_html_import: 'clean', // propmt, merge, clear
        powerpaste_allow_local_images: true,
        paste_data_images: true,
        images_upload_handler: function (blobInfo, success, failure, loading) {
          // 这个函数主要处理word中的图片，并自动完成上传；
          // 在回调中，记得调用success函数，传入上传好的图片地址；
          // blobInfo.blob() 得到图片的file对象；
          try {
            let blob = blobInfo.blob();
            let fileName = blobInfo.filename();
            let files = new File([blob], fileName, { type: blob.type });
            // let files = blob;
            _this.uploadImg(files, success, failure);
          } catch (err) {
            console.log(err);
          }
        },
        // 图片上传地址
        upload_path: process.env.NODE_ENV === 'production' ? '/jcms-c/pic/polling/upload' : '/myBase/pic/polling/upload',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          this.$emit('ready', editor);
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true;
            this.msg = editor.getContent();
            this.$emit('input', editor.getContent());
          });
        },
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state;
          });
        }
      });
    },
    destroyTinymce () {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen');
      }
      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent (value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent () {
      window.tinymce.get(this.tinymceId).getContent();
      console.log(window.tinymce.get(this.tinymceId).getContent());
    },
    // 获取控件列表
    getControllList () {
      let controllerList = [
        { tagId: "auto", label: "自定义控件", dicId: "-1", dicType: "2", isRequired: 0 },
        { tagId: "jc_signature", label: "测试控件1", dicId: 73, dicType: 1, isRequired: 1 },
        { tagId: "jc_stamp", label: "测试控件2", dicId: 74, dicType: 1, isRequired: 1 }
      ];
      localStorage.setItem('controlltype', JSON.stringify(controllerList));
    },
    uploadImg (file, success, failure) {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data', // 之前说的以表单传数据的格式来传递fromdata
          'isFormData': 'true'
        }
      };
      var fd = new FormData();
      fd.append('files', file);
      fd.append('fileName', file.name);
      // api.editorUploadImg(fd, config)
      //   .then(res => {
      //     success(res.data);
      //   });
    }
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
  margin: 0 auto;
}
.small-tip {
  font-size: 13px;
  margin-left: 10px;
}
.editor-msg {
  margin: 20px 0px;
}
.title{
  line-height: 30px;
  padding: 10px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 18px;
}
.editor-con{
  border: 1px solid #2c3e50;
}
</style>
