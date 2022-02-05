module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: 'NoJsJa Frontend Summary',
  base: '/frontend-summary/',
  description: '',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://nojsja.gitee.io/blogs/img/avatar/nojsja.jpeg',
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
        children: [
          '/html_css/base.md',
          '/html_css/keys.md',
        ],
      },
      {
        text: '➣ Javascript 部分',
        link: '/js',
        children: [
          '/js/base.md',
          '/js/keys.md',
        ],
      },
      {
        text: '➣ React 部分',
        link: '/react',
        children: [
          '/react/base.md',
          '/react/keys.md',
        ],
      },
      {
        text: '➣ Node 部分',
        link: '/node',
        children: [
          '/node/base.md',
          '/node/keys.md',
        ],
      },
      {
        text: '➣ 前端性能优化',
        link: '/optimization',
        children: [
          '/optimization/code.md',
          '/optimization/http.md',
          '/optimization/build.md',
        ],
      },
      {
        text: '➣ 前端工程化和架构',
        link: '/structure',
        children: [
          '/structure/base.md',
          '/structure/keys.md',
        ],
      },
      {
        text: '➣ 操作系统和网络',
        link: '/network_system',
        children: [
          '/network_system/base.md',
          '/network_system/keys.md',
          '/network_system/http.md',
          '/network_system/https.md',
        ],
      },
      {
        text: '➣ 设计模式',
        link: '/design_pattern',
        children: [
          '/design_pattern/decorator.md',
          '/design_pattern/flyweight.md',
          '/design_pattern/observer.md',
          '/design_pattern/proxy.md',
          '/design_pattern/responsibility_chain.md',
          '/design_pattern/state.md',
          '/design_pattern/strategy.md',
          '/design_pattern/template.md',
        ],
      },
      {
        text: '➣ 数据结构和算法',
        link: '/algorithms',
        children: [
          '/algorithms/array.md',
          '/algorithms/dp.md',
          '/algorithms/linked_list.md',
          '/algorithms/string.md',
          '/algorithms/sort.md',
          '/algorithms/tree.md',
          '/algorithms/others.md',
        ],
      },
    ],
  },
};