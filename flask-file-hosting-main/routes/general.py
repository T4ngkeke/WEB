import flask
import os
import datetime
import hashlib

from utils.file import human_readable_size
from routes.api import Upload

blueprint = flask.Blueprint('general', __name__)

@blueprint.route('/files', methods=['GET'])
def files():
    files1=Upload.query.filter_by(username='admin').all()
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
        files.append({"file_name":file_name,"file_path":file_path,"file_download_path":file_path.replace("view/", "view/raw/"),"file_delete_path":file_delete_path,"file_rename_path":file_rename_path,"file_extension":file_extension,"file_date":file_date,"file_size":file_size})   
    return files
   
