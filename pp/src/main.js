import { createApp, h } from 'vue'
import App from './App.vue'
import Password from './Password.vue'

//createApp(App).mount('#app')

const NotFoundComponent = { template: '<p>Page not found</p>' }
const AboutComponent = { template: '<p>About page</p>' }

const routes = {
  '/': Password,
  '/about': AboutComponent,
  '/logado': App
}

const SimpleRouter = {
    data: () => ({
      currentRoute: window.location.pathname
    }),
  
    computed: {
      CurrentComponent() {
        return routes[this.currentRoute] || NotFoundComponent
      }
    },
  
    render() {
      return h(this.CurrentComponent)
    }
  }

createApp(SimpleRouter).mount('#app')