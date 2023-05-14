from flask import Blueprint, request
import pickle
import pandas as pd
from sklearn.metrics import accuracy_score

# Load data
X_test = pd.read_csv('../data/X_test.csv')
Y_test = pd.read_csv('../data/Y_test.csv')

# Load modelS
dtree_model = pickle.load(open('../models/dtree_model.pkl', 'rb'))
knc_model = pickle.load(open('../models/knc_model.pkl', 'rb'))
rid_clf_model = pickle.load(open('../models/rid_clf_model.pkl', 'rb'))
nn_model = pickle.load(open('../models/nn_model.pkl', 'rb'))

# Create blueprints
models_bp = Blueprint('models', __name__)

# cors
@models_bp.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Access-Control-Allow-Headers'] = '*'
    return response

# Create routes for each model 
@models_bp.route('/dtree/test', methods=['GET'])
def dtree():
    return {
        "accuracy": accuracy_score(Y_test, dtree_model.predict(X_test) ) * 100 
    }

@models_bp.route('/dtree/custom', methods=['POST'])
def dtree_custom():
    data = request.get_json()
    df = pd.DataFrame(data, index=[0])
    result = dtree_model.predict(df)[0]
    print(result == 0)
    return {
        "result": 0 if result == 0 else 1
    }

@models_bp.route('/knc/test', methods=['GET'])
def knc():
    return {
        "accuracy": accuracy_score(Y_test, knc_model.predict(X_test) ) * 100
    }
@models_bp.route('/knc/custom', methods=['POST'])
def knc_custom():
    data = request.get_json()
    df = pd.DataFrame(data, index=[0])
    result = knc_model.predict(df)[0]
    print(result == 0)
    return {
        "result": 0 if result == 0 else 1
    }

@models_bp.route('/rid_clf/test', methods=['GET'])
def rid_clf():
    return {
        "accuracy": accuracy_score(Y_test, rid_clf_model.predict(X_test) ) * 100
    }
@models_bp.route('/rid_clf/custom', methods=['POST'])
def rid_clf_custom():
    data = request.get_json()
    df = pd.DataFrame(data, index=[0])
    result = rid_clf_model.predict(df)[0]
    print(result == 0)
    return {
        "result": 0 if result == 0 else 1
    }

@models_bp.route('/nn/test', methods=['GET'])
def nn():
    return {
        "accuracy": accuracy_score(Y_test, nn_model.predict(X_test) ) * 100
    }
@models_bp.route('/nn/custom', methods=['POST'])
def nn_custom():
    data = request.get_json()
    df = pd.DataFrame(data, index=[0])
    result = nn_model.predict(df)[0]
    print(result == 0)
    return {
        "result": 0 if result == 0 else 1
    }