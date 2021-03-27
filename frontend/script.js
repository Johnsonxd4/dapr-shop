function getCart(name) {
  return fetch(`http://localhost:3501/v1.0/invoke/cart/method/cart?user=${name}`)
    .then(response => response.json())
}

function addToCart(user,productId){
  var method = { method: 'PUT' };
  return fetch(`http://localhost:3501/v1.0/invoke/cart/method/cart?user=${user}&productId=${productId}`,method)
    .then(response => response.text())
    .then(response => alert(response))
    .catch(error => console.log(error))
}

function removeFromCart(user,productId){
  var method = { method: 'DELETE' };
  return fetch(`http://localhost:3501/v1.0/invoke/cart/method/cart?user=${user}&productId=${productId}`,method)
    .then(response => response.text())
    .then(response => alert(response))
    .catch(error => console.log(error))
}

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      user: "anonimo",
      products: null,
      cart: null,
      hasItems: false
    }
  },
  mounted() {
    this.user = prompt("Qual o seu nome?");
    this.updateCart();
    fetch('http://localhost:3500/v1.0/invoke/product/method/products')
      .then(response => response.json())
      .then(json => { this.products = json })
  },
  methods: {
    addToCart: function (id) {
        addToCart(this.user, id)
        .then(response => this.updateCart())
        
    },
    removeFromCart: function(id){
      removeFromCart(this.user,id)
      .then(response => this.updateCart())
    },
    updateCart: function(){
    getCart(this.user)
      .then(response => {
        this.cart = response.cart;
        return this.cart
      }).then(
        cart => {
          this.hasItems = () => {
            if (cart.lenght > 0) {

              return true
            }
            else {
              return false;
            }
          }
        });
    }
  }
})