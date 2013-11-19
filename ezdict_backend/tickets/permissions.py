from rest_framework import permissions


class UpdDelByOwnerOrAdminOtherMethodsForAuthenticated(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated()

        return request.user.is_staff or obj.user == request.user