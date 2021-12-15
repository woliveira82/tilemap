from flask import Flask, request, render_template
from webargs import fields
from webargs.flaskparser import parser

app = Flask(__name__)
app.config['ENV'] = 'development'
app.config['DEBUG'] = True



@app.route('/', methods=['GET'])
def index():
    query = parser.parse({
        'size': fields.Int(),
        'room': fields.Int(),
        'hall': fields.Int(),
        'type': fields.Str()
    }, request, location='query')
    return render_template('index.html', config=query)


if __name__ == '__main__':
    app.run()
    