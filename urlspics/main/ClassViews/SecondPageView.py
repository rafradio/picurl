from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
import os

@method_decorator(csrf_exempt, name='dispatch')
class SecondPageView(TemplateView):
    template_name = "main/pics.html"
    
    def get(self, request, *args, **kwargs):
        
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        relPath = 'uploads/' + 'SU3W3FFG4V' + ".jpg"
        filePath = os.path.join(BASE_DIR, relPath)
        print(filePath)
        context = {'picture': relPath, 'text': "hello world"}
        return render(request, self.template_name, context)
    
    def post(self, request, *args, **kwargs):
        context = {}
        # print(request.POST['fileName'])
        return render(request, self.template_name, context)