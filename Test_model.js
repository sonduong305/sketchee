<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"> </script>
var model;
var load_model = async () => {
    model = await tf.loadLayersModel('model/model.json');
    
}
load_model()
console.log(JSON.stringify(model))