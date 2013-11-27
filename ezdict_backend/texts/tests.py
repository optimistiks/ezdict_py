from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import MyUser


class TextTest(APITestCase):
    def setUp(self):
        self.user = MyUser.objects.create_user(
            nickname='testusr', email='testusr@gmail.com', password='qwerty')
        self.client.login(username=self.user.email, password='qwerty')
        self.data = [
            {
                'title': 'test 1',
                'source': 'test source 1',
                'text': 'test text 1',
            },
            {
                'title': 'title 2',
                'source': 'test source 2',
                'text': 'test text 2',
            },
        ]
        self.TEXT_LIST_URL = reverse('text-list')

    def test_create_text_correct_data(self):
        response = self.client.post(self.TEXT_LIST_URL, self.data[0])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('id', response.data)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)
        self.assertEqual(response.data['user'], 'http://testserver' + reverse('myuser-detail', args=(self.user.id,)))
        self.assertEqual(response.data['title'], self.data[0]['title'])
        self.assertEqual(response.data['source'], self.data[0]['source'])
        self.assertEqual(response.data['text'], self.data[0]['text'])

    def test_create_text_empty_data(self):
        response = self.client.post(self.TEXT_LIST_URL, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)
        self.assertIn('source', response.data)
        self.assertIn('text', response.data)
        
    def test_get_single_text(self):
        created = self.client.post(self.TEXT_LIST_URL, self.data[0])
        response = self.client.get(reverse('text-detail', args=(created.data['id'],)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)
        self.assertEqual(response.data['id'], created.data['id'])
        self.assertEqual(response.data['user'], 'http://testserver' + reverse('myuser-detail', args=(self.user.id,)))
        self.assertEqual(response.data['title'], self.data[0]['title'])
        self.assertEqual(response.data['source'], self.data[0]['source'])
        self.assertEqual(response.data['text'], self.data[0]['text'])

    def test_edit_own_text(self):
        text = self.client.post(self.TEXT_LIST_URL, self.data[0])
        ownTextUrl = reverse('text-detail', args=(text.data['id'],))
        response = self.client.put(ownTextUrl, self.data[1])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('created', response.data)
        self.assertIn('updated', response.data)
        self.assertEqual(response.data['id'], text.data['id'])
        self.assertEqual(response.data['user'], 'http://testserver' + reverse('myuser-detail', args=(self.user.id,)))
        self.assertEqual(response.data['title'], self.data[1]['title'])
        self.assertEqual(response.data['source'], self.data[1]['source'])
        self.assertEqual(response.data['text'], self.data[1]['text'])

    def test_edit_anothers_text(self):
        self.client.logout()
        anotherUser = MyUser.objects.create_user(
            nickname='testusr2', email='testusr2@gmail.com', password='qwerty')
        self.client.login(username=anotherUser.email, password='qwerty')
        text = self.client.post(self.TEXT_LIST_URL, self.data[0])
        anothersTextUrl = reverse('text-detail', args=(text.data['id'],))
        self.client.logout()
        self.client.login(username=self.user.email, password='qwerty')
        response = self.client.put(anothersTextUrl, self.data[1])
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn('detail', response.data)

    def test_delete_own_text(self):
        text = self.client.post(self.TEXT_LIST_URL, self.data[0])
        ownTextUrl = reverse('text-detail', args=(text.data['id'],))
        response = self.client.delete(ownTextUrl)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_anothers_text(self):
        self.client.logout()
        anotherUser = MyUser.objects.create_user(
            nickname='testusr2', email='testusr2@gmail.com', password='qwerty')
        self.client.login(username=anotherUser.email, password='qwerty')
        text = self.client.post(self.TEXT_LIST_URL, self.data[0])
        anothersTextUrl = reverse('text-detail', args=(text.data['id'],))
        self.client.logout()
        self.client.login(username=self.user.email, password='qwerty')
        response = self.client.delete(anothersTextUrl)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_text_list(self):
        self.client.post(self.TEXT_LIST_URL, self.data[0])
        self.client.post(self.TEXT_LIST_URL, self.data[1])
        self.client.post(self.TEXT_LIST_URL, self.data[0])
        response = self.client.get(self.TEXT_LIST_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)
        self.assertNotIn('text', response.data[0])

    def test_get_filtered_text_list(self):
        self.client.post(self.TEXT_LIST_URL, self.data[0])
        self.client.post(self.TEXT_LIST_URL, self.data[1])
        self.client.logout()

        secondUser = MyUser.objects.create_user(
            nickname='testusr2', email='testusr2@gmail.com', password='asdfgh')
        self.client.login(username=secondUser.email, password='asdfgh')

        response = self.client.get(self.TEXT_LIST_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        self.client.post(self.TEXT_LIST_URL, self.data[0])
        response = self.client.get(self.TEXT_LIST_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

        #фильтрация текстов по вхождению строки query в title
        response = self.client.get(self.TEXT_LIST_URL, {'query': self.data[0]['title']})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        response = self.client.get(self.TEXT_LIST_URL, {'limit': 2})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        response = self.client.get(self.TEXT_LIST_URL, {'offset': 2})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def tearDown(self):
        self.client.logout()
