module.exports = {
  title: 'Alex Casillas',
  description: 'Frontend Software Developer',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Open Source',
        items: [
          {
            text: 'Cratebox',
            link: 'https://github.com/alexvcasillas/cratebox'
          },
          {
            text: 'Cratebox React',
            link: 'https://github.com/alexvcasillas/cratebox-react'
          },
          {
            text: 'Animated Styled Components',
            link: 'https://github.com/alexvcasillas/animated-styled-components'
          },
          {
            text: 'React MobX State Tree',
            link: 'https://github.com/alexvcasillas/react-mobx-state-tree'
          },
          {
            text: 'React MobX Router + i18n',
            link: 'https://github.com/alexvcasillas/react-mobx-router'
          }
        ]
      },
      { text: 'Github', link: 'https://github.com/alexvcasillas' }
    ],
    sidebar: [
      {
        title: 'Cratebox',
        collapsable: false,
        children: [
          ['/cratebox', 'Cratebox Core'],
          ['/cratebox-react', 'Cratebox React']
        ]
      },
      {
        title: 'Javascript',
        collapsable: false,
        children: [
          ['/array-methods', 'Array methods'],
          ['/promises', 'Promises']
        ]
      }
    ]
  }
};
