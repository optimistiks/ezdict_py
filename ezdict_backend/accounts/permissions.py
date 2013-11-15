from rest_framework import permissions


class AllowCreateForAnyoneButAuthenticateList(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        else:
            return request.user.is_authenticated()