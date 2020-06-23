const path = require('path')
module.exports = {
  title: "进击的小超人",
  description: 'Enjoy when you can, and endure when you must.',
  dest: 'public',
  base: '/ylblog/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      { text: '关于作者', link: '/blogs/about/', icon: 'reco-account' },
      { text: '其他', 
        icon: 'reco-message',
        items: [
          { text: 'GitHub', link: 'https://github.com/winteroo', icon: 'reco-github' }
        ]
      }
    ], 
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
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
    ],
    logo: '/logo.jpg',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    // 最后更新时间
    lastUpdated: '上次更新',
    // 作者
    author: 'yangw',
    // 作者头像
    authorAvatar: '/yangw.jpg',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2020',
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
      appId: 'cpPdaCS4D4g9x7hYpeRiqzL8-gzGzoHsz',// your appId
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
        '@Other': path.join(__dirname, '..', 'blogs/other')
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
    ]
  ]
}  
