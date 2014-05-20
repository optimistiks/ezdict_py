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
        self.client.logout()
        anotherUser = MyUser.objects.create_user(
            nickname='testusr2', email='testusr2@gmail.com', password='qwerty')
        self.client.login(username=anotherUser.email, password='qwerty')
        anothersResponse = self.client.post(self.searchLogCreate, {'word': 'test'})

        self.client.logout()
        self.client.login(username=self.user.email, password='qwerty')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['word'], 'test')
        self.assertEqual(response.data['count'], 1)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)

        self.assertEqual(anothersResponse.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', anothersResponse.data)
        self.assertNotEqual(response.data['id'], anothersResponse.data['id'])
        self.assertEqual(anothersResponse.data['user'], anotherUser.id)
        self.assertEqual(response.data['word'], 'test')
        self.assertEqual(response.data['count'], 1)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)

    def test_update_search_log_existing_word(self):
        wordHello = self.client.post(self.searchLogCreate, {'word': 'hello'})
        wordHi = self.client.post(self.searchLogCreate, {'word': 'hi'})

        self.client.post(self.searchLogCreate, {'word': 'hello'})
        wordHelloUpdate = self.client.post(self.searchLogCreate, {'word': 'hello'})

        self.client.post(self.searchLogCreate, {'word': 'hi'})
        wordHiUpdate = self.client.post(self.searchLogCreate, {'word': 'hi'})

        self.assertEqual(wordHelloUpdate.status_code, status.HTTP_200_OK)
        self.assertEqual(wordHelloUpdate.data['id'], wordHello.data['id'])
        self.assertEqual(wordHelloUpdate.data['user'], self.user.id)
        self.assertEqual(wordHelloUpdate.data['word'], 'hello')
        self.assertEqual(wordHelloUpdate.data['count'], 3)
        self.assertIn('created', wordHelloUpdate.data)
        self.assertIn('updated', wordHelloUpdate.data)

        self.assertEqual(wordHiUpdate.status_code, status.HTTP_200_OK)
        self.assertEqual(wordHiUpdate.data['id'], wordHi.data['id'])
        self.assertEqual(wordHiUpdate.data['user'], self.user.id)
        self.assertEqual(wordHiUpdate.data['word'], 'hi')
        self.assertEqual(wordHiUpdate.data['count'], 3)
        self.assertIn('created', wordHiUpdate.data)
        self.assertIn('updated', wordHiUpdate.data)

    def test_search_the_same_word_with_whitespaces(self):
        response = self.client.post(self.searchLogCreate, {'word': 'test_whitespaces'})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['word'], 'test_whitespaces')
        self.assertEqual(response.data['count'], 1)

        response = self.client.post(self.searchLogCreate, {'word': ' test_whitespaces '})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['word'], 'test_whitespaces')
        self.assertEqual(response.data['count'], 2)


    def test_create_search_log_no_word(self):
        response = self.client.post(self.searchLogCreate, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_single_search_log(self):
        wordTest = self.client.post(self.searchLogCreate, {'word': 'test'})
        self.client.post(self.searchLogCreate, {'word': 'what'})
        self.client.post(self.searchLogCreate, {'word': 'here'})
        wordHere = self.client.post(self.searchLogCreate, {'word': 'here'})
        response = self.client.get(reverse('ticket-search-log'), {'word': 'test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], wordTest.data['id'])
        self.assertEqual(response.data['word'], 'test')
        self.assertEqual(response.data['count'], 1)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)
        response = self.client.get(reverse('ticket-search-log'), {'word': 'here'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], wordHere.data['id'])
        self.assertEqual(response.data['word'], 'here')
        self.assertEqual(response.data['count'], 2)
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
