from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class EzTicketTests(APITestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password='qwerty')
        self.client.login(username=self.user.email, password='qwerty')

    def test_get_ez_dict_ticket(self):
        response = self.client.get(reverse('ez_ticket-dict'), {'word': 'hello'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('head', response.data)
        self.assertIn('def', response.data)
        self.assertGreater(len(response.data['def']), 0)

    def test_get_ez_translate_ticket(self):
        response = self.client.get(reverse('ez_ticket-translate'), {'word': 'hello'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('lang', response.data)
        self.assertIn('text', response.data)
        self.assertIn('code', response.data)
        self.assertGreater(len(response.data['text']), 0)
        self.assertEqual(response.data['code'], 200)

    def test_get_ez_ticket_with_no_word_parameter(self):
        response = self.client.get(reverse('ez_ticket-dict'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)
        response = self.client.get(reverse('ez_ticket-translate'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)

    def tearDown(self):
        self.client.logout()
