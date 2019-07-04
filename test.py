# class_names =[]
# with open('model\\class_names.txt', 'r') as f:
#     class_names = f.readlines()

# print((class_names))

import numpy as np
import cv2

img = cv2.imread('temp\\temp.jpeg',0)
img = img>10
cv2.imshow('src',img)
cv2.waitKey()