
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'fix-td-rule': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'fix-td-rule': ({subject, type}) => {
          console.log(subject, type)
          const hasTD = type === 'fix' && !/\[\d{8}\]/.test(subject) 
          return [
            !hasTD,
            `Your subject should contain td number in type of fix`,
          ];
        },
      },
    },
  ]
}