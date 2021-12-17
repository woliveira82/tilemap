from flask import Flask, request, render_template
from webargs import fields
from webargs.flaskparser import parser
import numpy as np

app = Flask(__name__)
app.config['ENV'] = 'development'
app.config['DEBUG'] = True



@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/maps', methods=['GET'])
@parser.use_args({
    'height': fields.Int(missing=64),
    'width': fields.Int(missing=64),
    'rooms': fields.Int(missing=4),
    'halls': fields.Int(missing=20),
    'type': fields.Str()
}, location='query')
def get_map(args):
    random_map = np.random.randint(1, high=5, size=(args['width'], args['height']))
    return {'map': random_map.tolist()}
    

if __name__ == '__main__':
    app.run()
    