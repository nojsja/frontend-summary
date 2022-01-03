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
      // 字符串 - 页面文件路径
      '/README.md',
    ],
  },
};