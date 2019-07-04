class_names =[]
with open('model\\class_names.txt', 'r') as f:
    class_names = f.readlines()

print((class_names))
