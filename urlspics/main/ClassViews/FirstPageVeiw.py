from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class FirstPageView(TemplateView):
    template_name = "main/layout.html"
    
    def get(self, request, *args, **kwargs):
        context = {}
        return render(request, self.template_name, context)
    
    def post(self, request, *args, **kwargs):
        context = {}
        # print(request.POST['fileName'])
        return render(request, self.template_name, context)