from rest_framework.response import Response
from rest_framework.decorators import api_view
import base64
import json  
import os
import string
import random

@api_view(['GET', 'POST'])
def getData(request):
    dictTest = {'data': ""}
    if request.method == 'POST':
        data = request.data
        base64Data = data['data']
        if "data:image" in base64Data:
            base64Data = base64Data.split(",")[1]
        image_bytes = base64.b64decode(base64Data)
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        res = ''.join(random.choices(string.ascii_uppercase +string.digits, k=10))
        relPath = 'main/static/uploads/' + res + ".jpg"
        filePath = os.path.join(BASE_DIR, relPath)
        with open(filePath, "wb") as fh:
            fh.write(image_bytes)
        
        domain = request.build_absolute_uri('/')[:-1]
        shortLink = domain + "/" + res
        dictTest['data'] = shortLink
        
    return Response(dictTest)