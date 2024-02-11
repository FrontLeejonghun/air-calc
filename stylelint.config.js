module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-styled-syntax',
  overrides: [
    {
      files: ['**/*.tsx'],
      customSyntax: 'postcss-styled-syntax',
      // customSyntax: "@stylelint/postcss-css-in-js",
    },
  ],
  rules: {
    // css 속성 작성 시 empty line 관련 설정
    'declaration-empty-line-before': [
      'always',
      {
        ignore: [
          'first-nested',
          'after-comment',
          'after-declaration',
          'inside-single-line-block',
        ],
      },
    ],
    'order/order': ['custom-properties', 'declarations'],
    // css 속성 그룹 및 순서 설정
    'order/properties-order': [
      {
        // 그룹 이름 설정
        groupName: 'Layout',
        // 그룹 내부 emptyline 사용 여부
        noEmptyLineBetween: true,
        // 그룹 css 속성 멤버
        properties: [
          'display',
          'flex',
          'visibility',
          'overflow',
          'float',
          'clear',
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
        ],
      },
      {
        groupName: 'Box',
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
        properties: [
          'width',
          'height',
          'margin',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'padding',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
          'border',
        ],
      },
      {
        groupName: 'Background',
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
        properties: ['background-color'],
      },
      {
        groupName: 'Font',
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
        properties: [
          'color',
          'font-style',
          'font-weight',
          'font-size',
          'line-height',
          'letter-spacing',
          'text-align',
          'text-indent',
          'vertical-align',
          'white-space',
        ],
      },
      {
        groupName: 'Animation',
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
        properties: ['animation'],
      },
    ],
  },
};
