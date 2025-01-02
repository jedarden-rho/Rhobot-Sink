// @ts-check
import antfu from '@antfu/eslint-config'
export default {
  ...antfu(),
  ignores: ['components/ui', '.data', 'public/world.json'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'vue/no-v-html': 'off',
  },
}
