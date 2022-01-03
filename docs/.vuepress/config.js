module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: 'NoJsJa Frontend Summary',
  description: '',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
    ],
    navbar: [
      {
        text: 'Blogs',
        link: 'https://nojsja.gitee.io/blogs',
      },
      {
        text: 'Github',
        link: 'https://github.com/nojsja',
      },
    ],
    sidebar: [
      // 字符串 - 页面文件路径
      '/README.md',
      // NavbarItem
      {
        text: '➣ HTML/CSS 部分',
        link: '/html_css',
        children: ['/html_css/1.md'],
      },
      {
        text: '➣ Javascript 部分',
        link: '/js',
        children: ['/js/1.md'],
      },
      {
        text: '➣ React 部分',
        link: '/react',
        children: ['/react/1.md'],
      },
      {
        text: '➣ Node 部分',
        link: '/node',
        children: ['/node/1.md'],
      },
      {
        text: '➣ 前端性能优化',
        link: '/optimization',
        children: ['/optimization/1.md'],
      },
      {
        text: '➣ 前端工程化和架构',
        link: '/structure',
        children: ['/structure/1.md'],
      },
      {
        text: '➣ 操作系统和网络',
        link: '/network_system',
        children: ['/network_system/1.md'],
      },
      {
        text: '➣ 设计模式',
        link: '/design_pattern',
        children: [
          '/design_pattern/1.md',
          '/design_pattern/2.md',
          '/design_pattern/3.md',
          '/design_pattern/4.md',
          '/design_pattern/5.md',
          '/design_pattern/6.md',
          '/design_pattern/7.md',
          '/design_pattern/8.md',
        ],
      },
      {
        text: '➣ 数据结构和算法',
        link: '/algorithms',
        children: ['/algorithms/1.md'],
      },
    ],
  },
};