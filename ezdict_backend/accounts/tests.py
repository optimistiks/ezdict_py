from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class UsersTests(APITestCase):
    def setUp(self):
        self.USER_PASSWORD = 'qwerty'
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password=self.USER_PASSWORD)
        self.loginUrl = reverse('myuser-login')
        self.userListUrl = reverse('myuser-list')

    def test_user_creation_with_correct_data(self):
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

    def test_user_creation_with_empty_data(self):
        response = self.client.post(self.userListUrl, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('nickname', response.data)
        self.assertIn('email', response.data)
        self.assertIn('password', response.data)

    def test_user_login_with_correct_credentials(self):
        response = self.client.post(self.loginUrl, {'username': self.user.email, 'password': 'qwerty'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['nickname'], self.user.nickname)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertIn('tickets', response.data)

    def test_user_login_with_empty_credentials(self):
        response = self.client.post(self.loginUrl, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)

    def test_user_login_with_wrong_credentials(self):
        response = self.client.post(self.loginUrl, {'username': 'wrong', 'password': 'credentials'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)

    def test_get_single_user(self):
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        response = self.client.get(reverse('myuser-detail', args=(self.user.id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['nickname'], self.user.nickname)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertIn('tickets', response.data)
        self.assertNotIn('password', response.data)
        self.client.logout()

    def test_get_user_list(self):
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        response = self.client.get(self.userListUrl)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)
        self.client.logout()