from flask import Flask
from models import models_bp

app = Flask(__name__)
app.run(debug=True)
app.register_blueprint(models_bp)

@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)