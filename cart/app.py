from flask import Flask,request
import requests
import os
import json
app = Flask(__name__)
dapr_port = os.getenv('DAPR_HTTP_PORT')
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
    if response.status_code == 200: 
        return response.json()
    return response.json()

def add_to_cart_store(productId, userName):
    """
    Adds a product in the cart
    """
    body = json.dumps([{
            'key': userName,
            'value':  productId
        }])
    response = requests.post(f'http://localhost:{dapr_port}/v1.0/state/{cart_store}',
    data=body)
    return response.json()

def get_from_cart_store(userName): 
    """
    Get the cart information on the store
    """
    response = requests.get(f'http://localhost:{dapr_port}/v1.0/state/{cart_store}/{userName}') 
    return int(response.json())

@app.route('/add',methods=['POST'])
def add():
    productId = request.args.get("productId")
    userName = request.args.get("user")
    if product_exists(productId):
        return add_to_cart_store(productId, userName)
    return "the item do not exits"

@app.route('/cart',methods=['GET'])
def get_cart():
    userName = request.args.get("user")
    itemsId =  get_from_cart_store(userName)
    return get_item(itemsId)
    

if __name__ == '__main__':
    app.run(port=5050)