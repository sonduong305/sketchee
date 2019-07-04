from flask import Flask,request,Response,jsonify
from flask_cors import CORS
import keras
from keras import layers
import tensorflow as tf
import numpy as np
import cv2
import re
import base64
import json
from init_model import load_model
keras.backend.clear_session()
def application(environ, start_response):
  if environ['REQUEST_METHOD'] == 'OPTIONS':
    start_response(
      '200 OK',
      [
        ('Content-Type', 'application/json'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Headers', 'Authorization, Content-Type'),
        ('Access-Control-Allow-Methods', 'POST'),
      ]
    )
    return ''

model = load_model()
class_names =[]
with open('model\\class_names.txt', 'r') as f:
    class_names = f.readlines()


app = Flask(__name__)
CORS(app, resources={"/*" : {"origins" : "*"}})



@app.route('/')
def hello():
    return "Hello World!"

@app.route('/predict',methods=["POST"])
def disp_pic():
    data = request.get_json()
  # print(data)
    if data is None:
        print("No valid request body, json missing!")
        return jsonify({'error': 'No valid request body, json missing!'})
    else:

        img_data = data['img']
        
        # this method convert and save the base64 string to image
        # convert_and_save(img_data)
        # data = request.data
        content = img_data.split(';')[1]
        image_encoded = content.split(',')[1]
        body = base64.decodebytes(image_encoded.encode('utf-8'))
        nparr = np.fromstring(body, np.uint8)
        img = cv2.imdecode(nparr, 0)
        img = cv2.resize(img,(28,28))

        # make img contains only 0 and 255
        img = (img>10*(np.ones((img.shape))))*255
        img = np.array(img,dtype = np.int16)

        cv2.imwrite("temp\\temp.jpeg",img)
        img = img / 255.0
        img = np.around(img, 2)
        # print(img)
        img = np.expand_dims(img, axis=2)
        
        # cv2.waitKey()
        pred = model.predict(np.expand_dims(img, axis=0))
        
        ind = (-pred).argsort()[0,0]
        # print(ind)
        latex = class_names[ind]
        print(latex)
        m = {'name': latex}
    return jsonify(m)

if __name__ == '__main__':
    app.run(debug=True)
