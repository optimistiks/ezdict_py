from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class MyUserManager(BaseUserManager):
    def create_user(self, email, nickname, password):
        user = self.model(
            email=MyUserManager.normalize_email(email),
            nickname=nickname,
        )
 
        user.set_password(password)
        user.save(using=self._db)
        return user
 
    def create_superuser(self, email, nickname, password):
        user = self.create_user(email,
            password=password,
            nickname=nickname,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
 
 
class MyUser(AbstractBaseUser):
    email = models.EmailField(max_length=254, unique=True, db_index=True)
    nickname = models.CharField(max_length=255, unique=True, db_index=True)
 
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
 
    objects = MyUserManager()
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    def get_full_name(self):
        # For this case we return email. Could also be User.first_name User.last_name if you have these fields
        return self.nickname

    def get_short_name(self):
        # For this case we return email. Could also be User.first_name if you have this field
        return self.nickname

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        # Handle whether the user is a member of staff?"
        return self.is_admin