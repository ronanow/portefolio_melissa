# monapp/middleware.py

from .models import Visit

class VisitorTrackingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        exclusions = ['/static/', '/media/', '/favicon.ico', '/admin/']
        if not any(request.path.startswith(e) for e in exclusions):
            Visit.objects.create(
                ip=self.get_ip(request),
                path=request.path,
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                referer=request.META.get('HTTP_REFERER', None),
            )

        return response

    def get_ip(self, request):
        # Important pour Render qui passe l'IP via ce header
        x_forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded:
            return x_forwarded.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')