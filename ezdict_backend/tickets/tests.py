from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class TicketTests(APITestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password='qwerty')
        self.client.login(username=self.user.email, password='qwerty')
        self.testTicketData = {'word': 'test ticket', 'tr': 'test tiket', 'text': 'тестовый тикет'}
        self.ticketListUrl = reverse('ticket-list')

    def test_create_ticket_correct(self):
        response = self.client.post(self.ticketListUrl, self.testTicketData)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['id'], 1)
        self.assertEqual(response.data['user'], 'http://testserver/users/' + str(self.user.id) + '/')
        self.assertEqual(response.data['word'], 'test ticket')
        self.assertEqual(response.data['tr'], 'test tiket')
        self.assertIn('text', response.data)
        self.assertEqual(response.data['liked'], 0)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)

    def test_create_ticket_empty_fields(self):
        response = self.client.post(self.ticketListUrl, {})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('text', response.data)
        self.assertIn('tr', response.data)
        self.assertIn('word', response.data)

    def tearDown(self):
        self.client.logout()
