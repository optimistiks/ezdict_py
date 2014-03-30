from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class TicketSearchLogTests(APITestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password='qwerty')
        self.client.login(username=self.user.email, password='qwerty')
        self.searchLogCreate = reverse('ticket-search-log')

    def test_create_search_log_new_word(self):
        response = self.client.post(self.searchLogCreate, {'word': 'test'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['word'], 'test')
        self.assertEqual(response.data['count'], 1)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)

    def test_update_search_log_existing_word(self):
        createResponse = self.client.post(self.searchLogCreate, {'word': 'hello'})
        self.client.post(self.searchLogCreate, {'word': 'hello'})
        updateResponse = self.client.post(self.searchLogCreate, {'word': 'hello'})
        self.assertEqual(updateResponse.status_code, status.HTTP_200_OK)
        self.assertEqual(updateResponse.data['id'], createResponse.data['id'])
        self.assertEqual(updateResponse.data['user'], self.user.id)
        self.assertEqual(updateResponse.data['word'], 'hello')
        self.assertEqual(updateResponse.data['count'], 3)
        self.assertIn('created', updateResponse.data)
        self.assertIn('updated', updateResponse.data)

    def test_create_search_log_no_word(self):
        response = self.client.post(self.searchLogCreate, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_single_search_log(self):
        created = self.client.post(self.searchLogCreate, {'word': 'test'})
        response = self.client.get(reverse('ticket-search-log'), {'word': 'test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], created.data['id'])
        self.assertEqual(response.data['word'], 'test')
        self.assertEqual(response.data['count'], 1)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)

    def test_get_single_search_log_no_word(self):
        response = self.client.get(reverse('ticket-search-log'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_single_search_log_nonexisting_word(self):
        response = self.client.get(reverse('ticket-search-log'), {'word': 'abyrvalg'})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def tearDown(self):
        self.client.logout()
