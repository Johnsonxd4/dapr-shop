function getCart(name) {
  return fetch(`http://localhost:3501/v1.0/invoke/cart/method/cart?user=${name}`)
  .then(response => response.json())
}


var app = new Vue({
    el: '#app',
    data: function () {
      return {
        user: "anonimo",
        products: null,
        cart: null
      }
    },
    mounted() {
      this.user  = prompt("Qual o seu nome?");
  
      getCart(this.user)
        .then(response => {this.cart = response.cart})


      fetch('http://localhost:3500/v1.0/invoke/product/method/products')
      .then(response => response.json())
      .then(json => {this.products = json})
    }
  })

  // userApp = new Vue({
  //   el: '#userSession',
  //   data: function () {
  //     return {user: "anonimo"}
  //   },
  //   mounted() {
      
  //   }
  // })
  // var app2 = new Vue({
  //   el: '#app-2',
  //   data: {
  //     message: 'You loaded this page on ' + new Date().toLocaleString()
  //   }
  // })
  // var app3 = new Vue({
  //   el: '#app-3',
  //   data: {
  //     seen: true
  //   }
  // })

  // var app4 = new Vue({
  //   el: '#app-4',
  //   data: {
  //     todos: [
  //       { text: 'Learn JavaScript',seen: false },
  //       { text: 'Learn Vue', seen:true },
  //       { text: 'Build something awesome',seen:true }
  //     ],
  //   }
  // })

  // var app5 = new Vue({
  //   el: '#app-5',
  //   data: {
  //     message: 'Hello Vue.js!'
  //   },
  //   methods: {
  //     reverseMessage: function () {
  //       this.message = this.message.split('').reverse().join('')
  //     }
  //   }
  // })
  
  // Vue.component('todo-item', {
  //   props: ['todo'],
  //   template: '<li>{{ todo.text }}</li>'
  // })
  
  // var app7 = new Vue({
  //   el: '#app-7',
  //   data: {
  //     groceryList: [
  //       { id: 0, text: 'Vegetables' },
  //       { id: 1, text: 'Cheese' },
  //       { id: 2, text: 'Whatever else humans are supposed to eat' }
  //     ]
  //   }
  // })