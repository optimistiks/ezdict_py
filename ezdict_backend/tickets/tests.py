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

    def test_create_ticket_correct_data(self):
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

    def test_create_ticket_empty_data(self):
        response = self.client.post(self.ticketListUrl, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('text', response.data)
        self.assertIn('tr', response.data)
        self.assertIn('word', response.data)

    def test_get_single_ticket(self):
        created = self.client.post(self.ticketListUrl, self.testTicketData)
        response = self.client.get(reverse('ticket-detail', args=(created.data['id'],)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], created.data['id'])
        self.assertEqual(response.data['word'], self.testTicketData['word'])
        self.assertEqual(response.data['tr'], self.testTicketData['tr'])
        self.assertIn('text', response.data)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)

    def test_get_ticket_list(self):
        self.client.post(self.ticketListUrl, self.testTicketData)
        self.client.post(self.ticketListUrl, self.testTicketData)
        self.client.post(self.ticketListUrl, self.testTicketData)
        response = self.client.get(self.ticketListUrl)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def tearDown(self):
        self.client.logout()
