import datetime
from app import app
import flask
import os
import hashlib

from flask_sqlalchemy import SQLAlchemy



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
class User (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(50))
    password=db.Column(db.String(64))
    nickname=db.Column(db.String(100))
    question=db.Column(db.String(100))
    response=db.Column(db.String(100))

blueprint = flask.Blueprint('api', __name__)



@app.route('/login', methods=['POST'])
def do_admin_login():
    info=flask.request.get_json(force=True)
    POST_USERNAME=info['userName']
    POST_PASSWORD=str(hashlib.sha256(info['password'].encode('utf-8')).hexdigest())

    res=User.query.filter_by(username=POST_USERNAME).first()
    if res!=None:
        if res.password==POST_PASSWORD:
            return flask.jsonify({'success': True}), 200
    return flask.jsonify({'success': False}), 250

@blueprint.route('/user',methods=['POST'])
def upload_user():
    info=flask.request.get_json(force=True)
    #print(info)
    if info:
        #filename = file.filename
        #file_type à faire!
        if User.query.filter_by(username=info['email']).first()==None:

            user = User(username=info['email'],password=str(hashlib.sha256(info['password'].encode('utf-8')).hexdigest()),nickname=info['nickname'],question=info['question'],response=str(hashlib.sha256(info['response'].encode('utf-8')).hexdigest()))
            db.session.add(user)
            db.session.commit()

        #file.save(os.path.join(Config.get_upload_dir(), filename))
            return flask.jsonify({'success': True}), 200
    return flask.jsonify({'success': True}), 200





@blueprint.route("/api/upload", methods=['POST'])
def upload_file():
    if "file" not in flask.request.files:
        return flask.jsonify({'error': 'no file'}), 400

    file = flask.request.files['file']
    if file.filename == '':
        return flask.jsonify({'error': 'no file selected'}), 400
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
