# class_names =[]
# with open('model\\class_names.txt', 'r') as f:
#     class_names = f.readlines()

# print((class_names))

import numpy as np
import cv2

img = cv2.imread('temp\\temp.jpeg',0)

img = (img>10*(np.ones((img.shape))))*255
img = np.array(img,dtype = np.int16)
cv2.imshow('src',img)
cv2.imwrite("temp\\test_temp.jpg",img)
print(img)
cv2.waitKey()