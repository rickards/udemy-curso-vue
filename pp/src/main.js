import { createApp, h } from 'vue'
import App from './App.vue'

//createApp(App).mount('#app')

const NotFoundComponent = { template: '<p>Page not found</p>' }
const AboutComponent = { template: '<p>About page</p>' }

const routes = {
  '/': App,
  '/about': AboutComponent
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