from rest_framework import permissions


class CrForAnyoneOtherMethodsForAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        else:
            return request.user.is_authenticated()


class DelByAdminUpdByOwnerOrAdminOtherMethodsForAuthenticated(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated()

        return request.user.is_staff or obj == request.user