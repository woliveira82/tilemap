from flask import Flask, request, render_template
from webargs import fields
from webargs.flaskparser import parser
from map_genareator import Map

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
    map = Map(**args)
    return map.to_list()


if __name__ == '__main__':
    app.run()
