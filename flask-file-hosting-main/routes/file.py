import flask
import os
from io import BytesIO

from flask_sqlalchemy import SQLAlchemy
from routes.api import Upload,db
from utils.config import Config
from utils.file import File, human_readable_size

blueprint = flask.Blueprint('file', __name__)
allowed_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_."

#détails du fichier
@blueprint.route('/view/<path:path>')
def get_file(path):

    print(path)
    #print(path)
    #à réécrire
    myFile=Upload.query.filter_by(id=path).first()
    file_path="files/"+str(myFile.id) #==<Upload1>
    
    #file_path = os.path.join(Config.get_upload_dir(), path)
    #print(file_path)
    '''
    if not os.path.isfile(file_path):
        return flask.jsonify({'error': 'file does not exist'}), 404
    '''
    # lire les informations du fichier venant de la base de données

    file_delete_path = file_path.replace("files/", "/delete/")
    file_rename_path = file_path.replace("files/", "/rename/")
    file_name=myFile.filename
    file_extension = myFile.file_type
    #file_extension = os.path.splitext(file_path)[1]
    file_extension = myFile.file_type
    file_date = myFile.file_time
    file_size = myFile.file_size
    file_size = human_readable_size(file_size)

    #file = File(file_extension, file_path.replace("files/", "/view/raw/"), file_delete_path, file_rename_path, file_name, file_date, file_size)
    file= {"file_name":file_name,"file_path":file_path.replace("files/", "/view/raw/"),"file_delete_path":file_delete_path,"file_rename_path":file_rename_path,"file_extension":file_extension,"file_date":file_date,"file_size":file_size}
    return file
    #return flask.render_template('view.html', file=file, auth_token=flask.session["authorization"])
# téléchargement
@blueprint.route('/view/raw/<path:path>')
def get_raw_file(path):
    
    myFile=Upload.query.filter_by(id=path).first()
    return flask.send_file(BytesIO(myFile.data),download_name=myFile.filename,as_attachment=True)
# à réécrire 
# renommer
@blueprint.route('/rename/<path:path>', methods=['POST'])
def rename_file(path):
    
    myFile=Upload.query.filter_by(id=path).first()
    
    new_name = flask.request.json["new_name"]

    
    if not new_name:
        return flask.jsonify({'error': 'no new name'}), 400

    if not all(c in allowed_chars for c in new_name):
        return flask.jsonify({'error': 'invalid characters in name'}), 400
    
    myFile.filename=new_name
    db.session.commit()
    return flask.jsonify({'success': True}), 200
# à réécrire
# supprimer
@blueprint.route('/delete/<path:path>')
def delete_file(path):
   
    myFile=Upload.query.filter_by(id=path).first()
    db.session.delete(myFile)
    db.session.commit()
    return flask.jsonify({'success': True}), 200

@blueprint.route('/rename/<path:path>', methods=['GET'])
def get_file1(path):
    
    print(path)
    #print(path)
    #à réécrire
    myFile=Upload.query.filter_by(id=path).first()
    file_path="files/"+str(myFile.id) #==<Upload1>
    
   
    # lire les informations du fichier venant de la base de données

    file_delete_path = file_path.replace("files/", "/delete/")
    file_rename_path = file_path.replace("files/", "/rename/")
    file_name=myFile.filename
    file_extension = myFile.file_type
    #file_extension = os.path.splitext(file_path)[1]
    file_extension = myFile.file_type
    file_date = myFile.file_time
    file_size = myFile.file_size
    file_size = human_readable_size(file_size)

    #file = File(file_extension, file_path.replace("files/", "/view/raw/"), file_delete_path, file_rename_path, file_name, file_date, file_size)
    file= {"file_name":file_name,"file_path":file_path.replace("files/", "/view/raw/"),"file_delete_path":file_delete_path,"file_rename_path":file_rename_path,"file_extension":file_extension,"file_date":file_date,"file_size":file_size}
    return file
    #return flask.render_template('view.html', file=file, auth_token=flask.session["authorization"])
