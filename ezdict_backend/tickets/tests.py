from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class TicketTests(APITestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password='qwerty')
        self.client.login(username=self.user.email, password='qwerty')

    def test_create_ticket(self):
        url = reverse('ticket-list')
        data = {'word': 'test ticket', 'tr': 'test tiket', 'text': 'тестовый тикет'}

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['id'], 1)
        self.assertEqual(response.data['user'], 'http://testserver/users/1/')
        self.assertEqual(response.data['word'], 'test ticket')
        self.assertEqual(response.data['tr'], 'test tiket')
        self.assertIn('text', response.data)
        self.assertEqual(response.data['liked'], 0)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)

    def tearDown(self):
        self.client.logout()
