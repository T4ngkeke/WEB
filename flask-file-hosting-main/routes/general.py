import flask
import os
import datetime
import hashlib

from utils.file import File, human_readable_size
from utils.config import Config
from routes.api import Upload

blueprint = flask.Blueprint('general', __name__)
'''
@blueprint.route('/')
def index():
    if "authorization" not in flask.session:
        logged_in = False
    else:
        logged_in = flask.session["authorization"] == Config.get_auth_token()

    return flask.render_template('index.html', logged_in=logged_in)

@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if "authorization" not in flask.request.form or flask.request.form['authorization'] != Config.get_auth_token() or flask.request.method == 'GET':
        return flask.redirect(flask.url_for('general.index'))

    flask.session['authorization'] = Config.get_auth_token()
    return flask.redirect(flask.url_for('general.files'))

@blueprint.route('/logout')
def logout():
    flask.session.pop('authorization', None)
    return flask.redirect(flask.url_for('general.index'))
'''
@blueprint.route('/files', methods=['GET'])
def files():
    '''
    if flask.session.get('authorization') != Config.get_auth_token():
        return flask.redirect(flask.url_for('general.login'))
    '''
    # à réécrire
    # utiliser la base de données
    files1=Upload.query.filter_by(username='admin').all()
    #print (files1)
    #print(files1[1].file_size)
    files = []
    for file in files1:
        file_name=file.filename
        file_path = "/view/" + str(file.id)
        file_delete_path = file_path.replace("/view/", "/delete/")
        file_rename_path = file_path.replace("/view/", "/rename/")
        file_extension = file.file_type
        file_date = file.file_time
        file_size = file.file_size
        file_size = human_readable_size(file_size)
        files.append({"file_name":file_name,"file_path":file_path,"file_delete_path":file_delete_path,"file_rename_path":file_rename_path,"file_extension":file_extension,"file_date":file_date,"file_size":file_size})   
        #files.append(File(file_extension, file_path, file_delete_path, file_rename_path, file_name, file_date, file_size))
    #print(files)
    return files
    #return {'file_name':"myName"}
    #return flask.render_template('files.html', files=files, auth_token_hash=hashlib.md5(Config.get_auth_token().encode('utf-8')).hexdigest(), default_auth_token_hash="b0439fae31f8cbba6294af86234d5a28")
