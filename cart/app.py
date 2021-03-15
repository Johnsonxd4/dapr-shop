from flask import Flask,request,jsonify
import requests
import os
import json
app = Flask(__name__)
dapr_port = os.getenv('DAPR_HTTP_PORT',3501)
cart_store = 'cartstore'

def product_exists(id):
    """
    verify if product exists in product service
    """
    response = requests.get(f'http://localhost:{dapr_port}/v1.0/invoke/product/method/products/{id}')
    if response.status_code == 200: 
        return True
    return False

def get_item(id):
    """
    query the item in product service
    """
    response = requests.get(f'http://localhost:{dapr_port}/v1.0/invoke/product/method/products/{id}')
    return response.json()

def get_from_cart_store(userName): 
    """
    Get the cart information on the store
    """
    
    response = requests.get(f'http://localhost:{dapr_port}/v1.0/state/{cart_store}/{userName}')
    if response.status_code == 200:
        return response.json()
    return []

def add_to_cart_store(productId, userName):
    """
    Adds a product in the cart
    """
    currentCart = get_from_cart_store(userName)
    currentCart.append(productId)
    body = json.dumps([{
            'key': userName,
            'value':  currentCart
        }])
    response = requests.post(f'http://localhost:{dapr_port}/v1.0/state/{cart_store}',
    data=body)
    response.raise_for_status()



@app.route('/add',methods=['POST'])
def add():
    productId = request.args.get("productId")
    userName = request.args.get("user")
    if product_exists(productId):
        add_to_cart_store(productId, userName)
        return "The item was added"
    return "the item do not exits"

@app.route('/cart',methods=['GET'])
def get_cart():
    userName = request.args.get("user")
    itemsId =  get_from_cart_store(userName)
    items = []
    for itemId in itemsId:
        items.append(get_item(itemId))
    return jsonify({'cart': items})
    

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5050)