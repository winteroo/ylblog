(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{441:function(e,t,i){},616:function(e,t,i){"use strict";var n=i(0),a=i(40),o=i(617),r=i(213),l=i(1),s=1..toFixed,c=Math.floor,d=function(e,t,i){return 0===t?i:t%2==1?d(e,t-1,i*e):d(e*e,t/2,i)};n({target:"Number",proto:!0,forced:s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!l((function(){s.call({})}))},{toFixed:function(e){var t,i,n,l,s=o(this),u=a(e),m=[0,0,0,0,0,0],p="",f="0",h=function(e,t){for(var i=-1,n=t;++i<6;)n+=e*m[i],m[i]=n%1e7,n=c(n/1e7)},g=function(e){for(var t=6,i=0;--t>=0;)i+=m[t],m[t]=c(i/e),i=i%e*1e7},y=function(){for(var e=6,t="";--e>=0;)if(""!==t||0===e||0!==m[e]){var i=String(m[e]);t=""===t?i:t+r.call("0",7-i.length)+i}return t};if(u<0||u>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(p="-",s=-s),s>1e-21)if(i=(t=function(e){for(var t=0,i=e;i>=4096;)t+=12,i/=4096;for(;i>=2;)t+=1,i/=2;return t}(s*d(2,69,1))-69)<0?s*d(2,-t,1):s/d(2,t,1),i*=4503599627370496,(t=52-t)>0){for(h(0,i),n=u;n>=7;)h(1e7,0),n-=7;for(h(d(10,n,1),0),n=t-1;n>=23;)g(1<<23),n-=23;g(1<<n),h(1,1),g(2),f=y()}else h(0,i),h(1<<-t,0),f=y()+r.call("0",u);return f=u>0?p+((l=f.length)<=u?"0."+r.call("0",u-l)+f:f.slice(0,l-u)+"."+f.slice(l-u)):p+f}})},617:function(e,t,i){var n=i(20);e.exports=function(e){if("number"!=typeof e&&"Number"!=n(e))throw TypeError("Incorrect invocation");return+e}},618:function(e,t,i){"use strict";var n=i(441);i.n(n).a},624:function(e,t,i){"use strict";i.r(t);i(42),i(89),i(210),i(616),i(14);var n=["print powerpaste preview searchreplace autolink quickbars directionality visualblocks visualchars fullpage fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists imagetools wordcount textpattern help emoticons autosave   autoresize indent2em autoresize lineheight  axupimgs addController uploadimg"],a=["code undo redo restoredraft cut copy paste pastetext  forecolor backcolor bold italic underline strikethrough link anchor   alignleft aligncenter alignright alignjustify outdent indent  styleselect formatselect fontselect  fontsizeselect  bullist numlist   blockquote subscript superscript removeformat  table image media  charmap emoticons hr pagebreak insertdatetime  print preview  fullscreen  indent2em lineheight searchreplace uploadimg addController"],o={name:"TinymceEditor",props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:""},height:{type:[Number,String],required:!1,default:400},width:{type:[Number,String],required:!1,default:"auto"}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,msg:"",languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}},computed:{containerWidth:function(){var e=this.width;return/^[\d]+(\.[\d]+)?$/.test(e)?"".concat(e,"px"):e}},watch:{value:function(e){var t=this;!this.hasChange&&this.hasInit&&this.$nextTick((function(){return window.tinymce.get(t.tinymceId).setContent(e||"")}))}},mounted:function(){this.getControllList(),this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var e=this;i.e(116).then(i.bind(null,621)).then((function(t){(0,t.default)("/ylblog/tinymce/tinymce.min.js",(function(t){t?e.$message.error(t.message):e.initTinymce()}))}))},initTinymce:function(){var e=this,t=this,i=this.toolbar.length>0?this.toolbar:a;window.tinymce.init({selector:"#".concat(this.tinymceId),language:this.languageTypeList.zh,min_height:this.height,extended_valid_elements:"input[dic-id|dic-type|tag-id|value|style|class|id|type|readonly|disabled],span[id|dic-id]",menu:{file:{title:"File",items:"newdocument restoredraft  "},edit:{title:"Edit",items:"undo redo | cut copy paste | selectall | searchreplace"},view:{title:"View",items:"code | visualaid visualchars visualblocks | spellchecker | preview fullscreen"},insert:{title:"Insert",items:"image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime"},format:{title:"Format",items:"bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat"},tools:{title:"Tools",items:"spellchecker spellcheckerlanguage | code wordcount"},table:{title:"Table",items:"inserttable | cell row column | tableprops deletetable"},help:{title:"Help",items:"help"}},body_class:"panel-body",draggable_modal:!0,toolbar:i,menubar:this.menubar,plugins:n,contextmenu:"image imagetools table configurepermanentpen addController",fontsize_formats:"12px 14px 16px 18px 24px 36px 48px 56px 72px",font_formats:"黑体=SimHei,sans-serif;楷体=KaiTi,serif;微软雅黑=Microsoft YaHei,sans-serif;仿宋体=FangSong,serif;Arial=arial,helvetica,sans-serif;",default_link_target:"_blank",branding:!1,elementpath:!1,removed_menuitems:"",toolbar_mode:"sliding",toolbar_sticky:!0,fullpage_default_font_family:"SimHei,sans-serif;",statusbar:!1,powerpaste_word_import:"clean",powerpaste_html_import:"clean",powerpaste_allow_local_images:!0,paste_data_images:!0,images_upload_handler:function(e,i,n,a){try{var o=e.blob(),r=e.filename(),l=new File([o],r,{type:o.type});t.uploadImg(l,i,n)}catch(e){console.log(e)}},upload_path:"/jcms-c/pic/polling/upload",init_instance_callback:function(i){t.value&&i.setContent(t.value),e.$emit("ready",i),t.hasInit=!0,i.on("NodeChange Change KeyUp SetContent",(function(){e.hasChange=!0,e.msg=i.getContent(),e.$emit("input",i.getContent())}))},setup:function(e){e.on("FullscreenStateChanged",(function(e){t.fullscreen=e.state}))}})},destroyTinymce:function(){var e=window.tinymce.get(this.tinymceId);this.fullscreen&&e.execCommand("mceFullScreen"),e&&e.destroy()},setContent:function(e){window.tinymce.get(this.tinymceId).setContent(e)},getContent:function(){window.tinymce.get(this.tinymceId).getContent(),console.log(window.tinymce.get(this.tinymceId).getContent())},getControllList:function(){localStorage.setItem("controlltype",JSON.stringify([{tagId:"auto",label:"自定义控件",dicId:"-1",dicType:"2",isRequired:0},{tagId:"jc_signature",label:"测试控件1",dicId:73,dicType:1,isRequired:1},{tagId:"jc_stamp",label:"测试控件2",dicId:74,dicType:1,isRequired:1}]))},uploadImg:function(e,t,i){var n=new FormData;n.append("files",e),n.append("fileName",e.name)}}},r=(i(618),i(4)),l=Object(r.a)(o,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"tinymce-container",class:{fullscreen:e.fullscreen},style:{width:e.containerWidth}},[i("textarea",{staticClass:"tinymce-textarea",attrs:{id:e.tinymceId}})]),e._v(" "),i("div",{staticClass:"editor-msg"},[i("div",{staticClass:"title"},[e._v("获取的内容：")]),e._v(" "),i("div",{staticClass:"editor-con"},[e._v(e._s(e.msg))])])])}),[],!1,null,"f015fe4c",null);t.default=l.exports}}]);