import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
export default {
  plugins: [createVuePlugin(),  Components({
    resolvers: [VantResolver()],
  }),]
}