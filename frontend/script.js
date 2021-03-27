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