from rest_framework.reverse import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class UsersTests(APITestCase):
    def setUp(self):
        self.USER_PASSWORD = 'qwerty'
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password=self.USER_PASSWORD)
        self.admin = MyUser.objects.create_superuser(
            nickname='testadmin', email='testadmin@gmail.com', password=self.USER_PASSWORD)
        self.loginUrl = reverse('myuser-login', format='json')
        self.userListUrl = reverse('myuser-list')
        self.usersData = [
            {
                'nickname': 'testusrname',
                'email': 'testusrname@gmail.com',
                'password': 'testpassword',
            },
            {
                'nickname': 'testusrname2',
                'email': 'testusrname2@gmail.com',
                'password': 'testpassword',
            }
        ]

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

    def test_user_is_authenticated(self):
        isAuthenticatedUrl = reverse('myuser-isAuthenticated')
        response = self.client.post(isAuthenticatedUrl)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        response = self.client.post(isAuthenticatedUrl)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['nickname'], self.user.nickname)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertIn('tickets', response.data)

    def test_user_logout(self):
        logoutUrl = reverse('myuser-logout')
        isAuthenticatedUrl = reverse('myuser-isAuthenticated')
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        isAuthenticatedResponse = self.client.post(isAuthenticatedUrl)
        self.assertEqual(isAuthenticatedResponse.status_code, status.HTTP_200_OK)
        self.assertEqual(isAuthenticatedResponse.data['id'], self.user.id)
        self.assertEqual(isAuthenticatedResponse.data['nickname'], self.user.nickname)
        self.assertEqual(isAuthenticatedResponse.data['email'], self.user.email)
        self.assertIn('tickets', isAuthenticatedResponse.data)
        logoutResponse = self.client.post(logoutUrl)
        self.assertEqual(logoutResponse.status_code, status.HTTP_200_OK)
        isAuthenticatedResponse = self.client.post(isAuthenticatedUrl)
        self.assertEqual(isAuthenticatedResponse.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', isAuthenticatedResponse.data)


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

    def test_user_edit_own_user(self):
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        ownUserUrl = reverse('myuser-detail', args=(self.user.id,))
        response = self.client.put(ownUserUrl, self.usersData[0])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['nickname'], self.usersData[0]['nickname'])
        self.assertEqual(response.data['email'], self.usersData[0]['email'])
        self.assertIn('tickets', response.data)
        self.assertNotIn('password', response.data)

    def test_user_edit_other_user(self):
        otherUser = self.client.post(self.userListUrl, self.usersData[0])
        otherUserUrl = reverse('myuser-detail', args=(otherUser.data['id'],))
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        response = self.client.put(otherUserUrl, self.usersData[1])
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)

    def test_admin_edit_other_user(self):
        self.client.login(username=self.admin.email, password=self.USER_PASSWORD)
        otherUserUrl = reverse('myuser-detail', args=(self.user.id,))
        response = self.client.put(otherUserUrl, self.usersData[0])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.user.id)
        self.assertEqual(response.data['nickname'], self.usersData[0]['nickname'])
        self.assertEqual(response.data['email'], self.usersData[0]['email'])
        self.assertIn('tickets', response.data)
        self.assertNotIn('password', response.data)

    def test_user_delete_user(self):
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        userUrl = reverse('myuser-detail', args=(self.user.id,))
        response = self.client.delete(userUrl)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_delete_user(self):
        self.client.login(username=self.admin.email, password=self.USER_PASSWORD)
        userUrl = reverse('myuser-detail', args=(self.user.id,))
        response = self.client.delete(userUrl)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_user_list(self):
        self.client.login(username=self.user.email, password=self.USER_PASSWORD)
        response = self.client.get(self.userListUrl)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)
        self.client.logout()