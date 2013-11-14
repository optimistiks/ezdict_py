from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class UsersTests(APITestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password='qwerty')
        self.loginUrl = reverse('myuser-login')
        self.userListUrl = reverse('myuser-list')

    def test_user_creation_correct(self):
        response = self.client.post(self.userListUrl, {
            'nickname': 'testusrname',
            'email': 'testusrname@gmail.com',
            'password': 'testpassword',
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertIn('tickets', response.data)
        self.assertNotIn('password', response.data)
        self.assertEqual(response.data['nickname'], 'testusrname')
        self.assertEqual(response.data['email'], 'testusrname@gmail.com')

    def test_user_creation_empty_fields(self):
        response = self.client.post(self.userListUrl, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('nickname', response.data)
        self.assertIn('email', response.data)
        self.assertIn('password', response.data)

    def test_user_login_correct(self):
        response = self.client.post(self.loginUrl, {'username': self.user.email, 'password': 'qwerty'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['nickname'], self.user.nickname)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertIn('tickets', response.data)

    def test_user_login_empty_fields(self):
        response = self.client.post(self.loginUrl, {})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)

    def test_user_login_wrong_credentials(self):
        response = self.client.post(self.loginUrl, {'username': 'wrong', 'password': 'credentials'})

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)

    def tearDown(self):
        self.client.logout()