const path = require('path')
console.log(process.env.NODE_ENV);
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
  title: "进击的小超人",
  description: '前端，javascript，js，算法，webpack，webpack4，webpack教程,babel，babel7，babel教程，eslint，vue，vue3，react',
  dest: 'public',
  base: '/ylblog/',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [{
        text: '首页',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: '系列教程',
        icon: 'reco-document',
        items: [{
          text: 'webpack教程',
          link: '/docs/webpack/01introduce.md'
        },{
          text: 'babel教程',
          link: '/docs/babel/01introduce.md'
        },{
          text: 'eslint教程',
          link: '/docs/eslint/01introduce.md'
        }]
      },
      {
        text: '时间线',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: '关于作者',
        link: '/blogs/about/',
        icon: 'reco-account'
      },
      {
        text: '其他',
        icon: 'reco-message',
        items: [{
          text: 'GitHub',
          link: 'https://github.com/winteroo',
          icon: 'reco-github'
        }]
      }
    ],
    sidebar: {
      '/docs/webpack/': [{
        title: 'webpack基础',
        collapsable: true,
        children: ['01introduce','02primer','02.5mode','03entry','04output','05loader','06plugin','07devserver']
      },{
        title: 'webpack进阶',
        collapsable: true,
        children: ['09splitchunk','10treeshaking','11writeloader','12writeplugin']
      }],
      '/docs/babel/': [{
        title: 'babel教程',
        collapsable: false,
        children: ['01introduce', '02start', '03configFile', '04polyfill', '05presets', '06plugins' ]
      }],      
      '/docs/eslint/': [{
        title: 'eslint教程',
        collapsable: false,
        children: ['01introduce','02start','03config','04eslintvue']
      }]
    },
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '文章' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签' // 默认 “标签”
      }
    },
    friendLink: [{
      title: 'vuepress-theme-reco',
      desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      link: 'https://vuepress-theme-reco.recoluan.com'
    }],
    logo: '/logo.jpg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: '上次更新',
    // 作者
    author: '杨威',
    // 作者头像
    authorAvatar: '/yangw.jpg',
    // 备案号
    record: '',
    // 项目开始时间
    startYear: '2020',
    editLinks: true,
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['083da05ef6de2a2d8da7ce61a3533010'], // 940906
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    valineConfig: {
      appId: 'cpPdaCS4D4g9x7hYpeRiqzL8-gzGzoHsz', // your appId
      appKey: 'qA0YCWkV6C3oYgonyHxagfSL', // your appKey
      placeholder: '发表你的感想...(添加网址可直接点击头像文字进入该地址哦)',
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@Front': path.join(__dirname, '..', 'blogs/front'),
        '@About': path.join(__dirname, '..', 'blogs/about'),
        '@Algorithm': path.join(__dirname, '..', 'blogs/algorithm'),
        '@Backend': path.join(__dirname, '..', 'blogs/backend'),
        '@Other': path.join(__dirname, '..', 'blogs/other'),
        '@Webpack': path.join(__dirname, '..', 'docs/webpack'),
        '@Eslint': path.join(__dirname, '..', 'docs/eslint'),
        '@Babel': path.join(__dirname, '..', 'docs/babel')
      }
    }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress/medium-zoom',
      {
        selector: '.theme-reco-content :not(a) > img',
        options: {
          margin: 20,
          background: 'rgba(0, 0, 0, 0.7)',
          scrollOffset: 90
        }
      }
    ],
    // [
    //   '@vuepress-reco/vuepress-plugin-bgm-player',
    //   {
    //     audios: [
    //       // 网络文件示例
    //       {
    //         name: '강남역 4번 출구',
    //         artist: 'Plastic / Fallin` Dild',
    //         url: 'https://assets.smallsunnyfox.com/music/2.mp3',
    //         cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
    //       },
    //       {
    //         name: '用胳膊当枕头',
    //         artist: '최낙타',
    //         url: 'https://assets.smallsunnyfox.com/music/3.mp3',
    //         cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
    //       },
    //       {
    //         name: '大鱼',
    //         artist: '周深',
    //         url: isDev ? '/bgm/dayu/dayu.mp3' : '/ylblog/bgm/dayu/dayu.mp3',
    //         cover: isDev ? '/bgm/dayu/zhoushen.jpg' : '/ylblog/bgm/dayu/zhoushen.jpg'
    //       }
    //     ],
    //     // 默认缩小
    //     autoShrink: false
    //   }
    // ]
  ]
}