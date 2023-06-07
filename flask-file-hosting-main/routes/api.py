import datetime
from app import app
import flask
import os
import hashlib

from flask import Flask, render_template,request,send_file
from flask_sqlalchemy import SQLAlchemy

from utils.config import Config

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)
    file_size=db.Column(db.BigInteger)
    file_time=db.Column(db.DateTime)
    file_type=db.Column(db.String(10))
    username=db.Column(db.String(50))

blueprint = flask.Blueprint('api', __name__)


@blueprint.route("/api/upload", methods=['POST'])
def upload_file():
    
    if flask.request.headers.get("Authorization") != hashlib.md5(Config.get_auth_token().encode()).hexdigest():
        if flask.request.headers.get('Authorization') != Config.get_auth_token(): 
            return flask.jsonify({'error': 'unauthorized'}), 403

    if "file" not in flask.request.files:
        return flask.jsonify({'error': 'no file'}), 400

    file = flask.request.files['file']
    if file.filename == '':
        return flask.jsonify({'error': 'no file selected'}), 400
    '''
    #réécire cette partie
    if os.path.exists(os.path.join(Config.get_upload_dir(), file.filename)):
        return flask.jsonify({'error': 'file already exists'}), 409
    '''
    #réécire cette partie
    if file:
        #filename = file.filename
        #file_type à faire!
        upload = Upload(filename=file.filename, data=file.read(),file_size=file.seek(0,os.SEEK_END),file_time=datetime.datetime.now(),file_type=os.path.splitext(file.filename)[1],username='admin')
        db.session.add(upload)
        db.session.commit()

        #file.save(os.path.join(Config.get_upload_dir(), filename))
        return flask.jsonify({'success': True}), 200

    return flask.jsonify({'error': 'unknown error'}), 500

@blueprint.route("/api/change_auth_token", methods=['POST'])
def change_auth_token():
    if flask.request.headers.get("Authorization") != hashlib.md5(Config.get_auth_token().encode()).hexdigest():
        if flask.request.headers.get('Authorization') != Config.get_auth_token(): 
            return flask.jsonify({'error': 'unauthorized'}), 403

    new_auth_token = flask.request.headers.get('new_auth_token')
    if new_auth_token == '':
        return flask.jsonify({'error': 'no new auth token'}), 400

    Config.change_auth_token(new_auth_token)
    flask.session["authorization"] = new_auth_token
    return flask.jsonify({'success': True}), 200