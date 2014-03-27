# from django.core.urlresolvers import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase
# from accounts.models import MyUser
#
#
# class TicketSearchLogTests(APITestCase):
#     def setUp(self):
#         self.user = MyUser.objects.create_user(
#             nickname='testusr', email='testusr@gmail.com', password='qwerty')
#         self.client.login(username=self.user.email, password='qwerty')
#         self.ticketSearchData = []
#         self.ticketSearchData.append({'word': 'what is', 'count': 5})
#         self.ticketSearchData.append({'word': 'bang bang', 'count': 15})
#         self.searchLogList = reverse('ticket-search-log-list')
#
#     def test_create_search_log_correct_data(self):
#         response = self.client.post(self.searchLogList, self.ticketSearchData[0])
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data['id'], 1)
#         self.assertEqual(response.data['user'], self.user.id)
#         self.assertEqual(response.data['word'], self.ticketSearchData[0]['word'])
#         self.assertEqual(response.data['count'], self.ticketSearchData[0]['count'])
#         self.assertIn('created', response.data)
#         self.assertIn('updated', response.data)
#
#     def test_create_search_log_empty_data(self):
#         response = self.client.post(self.searchLogList, {})
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertIn('word', response.data)
#         self.assertIn('count', response.data)
#
#     def test_get_single_search_log(self):
#         created = self.client.post(self.searchLogList, self.ticketSearchData[0])
#         response = self.client.get(reverse('ticket-search-log-detail', args=(created.data['id'],)))
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['id'], created.data['id'])
#         self.assertEqual(response.data['word'], self.ticketSearchData[0]['word'])
#         self.assertEqual(response.data['count'], self.ticketSearchData[0]['count'])
#         self.assertIn('created', response.data)
#         self.assertIn('updated', response.data)
#
#     def test_edit_own_ticket(self):
#         ticket = self.client.post(self.searchLogList, self.ticketSearchData[0]).data
#         ownTicketUrl = reverse('ticket-detail', args=(ticket['id'],))
#         response = self.client.put(ownTicketUrl, self.ticketSearchData[1])
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['id'], ticket['id'])
#         self.assertEqual(response.data['word'], self.ticketSearchData[1]['word'])
#         self.assertEqual(response.data['tr'], self.ticketSearchData[1]['tr'])
#
#     def test_edit_anothers_ticket(self):
#         self.client.logout()
#         anotherUser = MyUser.objects.create_user(
#             nickname='testusr2', email='testusr2@gmail.com', password='qwerty')
#         self.client.login(username=anotherUser.email, password='qwerty')
#         ticket = self.client.post(self.searchLogList, self.ticketSearchData[0]).data
#         anothersTicketUrl = reverse('ticket-detail', args=(ticket['id'],))
#         self.client.logout()
#         self.client.login(username=self.user.email, password='qwerty')
#         response = self.client.put(anothersTicketUrl, self.ticketSearchData[1])
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         self.assertIn('detail', response.data)
#
#     def test_delete_own_ticket(self):
#         ticket = self.client.post(self.searchLogList, self.ticketSearchData[0]).data
#         ownTicketUrl = reverse('ticket-detail', args=(ticket['id'],))
#         response = self.client.delete(ownTicketUrl)
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#
#     def test_delete_anothers_ticket(self):
#         self.client.logout()
#         anotherUser = MyUser.objects.create_user(
#             nickname='testusr2', email='testusr2@gmail.com', password='qwerty')
#         self.client.login(username=anotherUser.email, password='qwerty')
#         ticket = self.client.post(self.searchLogList, self.ticketSearchData[0]).data
#         anothersTicketUrl = reverse('ticket-detail', args=(ticket['id'],))
#         self.client.logout()
#         self.client.login(username=self.user.email, password='qwerty')
#         response = self.client.delete(anothersTicketUrl)
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#
#     def test_get_ticket_list(self):
#         self.client.post(self.searchLogList, self.ticketSearchData[0])
#         self.client.post(self.searchLogList, self.ticketSearchData[1])
#         self.client.post(self.searchLogList, self.ticketSearchData[0])
#         response = self.client.get(self.searchLogList)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 3)
#
#     def test_get_filtered_ticket_list(self):
#         #создание тикетов за первого пользователя, логаут
#         self.client.post(self.searchLogList, self.ticketSearchData[0])
#         self.client.post(self.searchLogList, self.ticketSearchData[1])
#         self.client.logout()
#
#         #создание второго пользователя, логин
#         secondUser = MyUser.objects.create_user(
#             nickname='testusr2', email='testusr2@gmail.com', password='asdfgh')
#         self.client.login(username=secondUser.email, password='asdfgh')
#
#         #проверка общего количества тикетов
#         response = self.client.get(self.searchLogList)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 2)
#
#         #создание тикета за второго пользователя, проверка общего количества тикетов
#         self.client.post(self.searchLogList, self.ticketSearchData[0])
#         response = self.client.get(self.searchLogList)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 3)
#
#         #проверка параметра own (тикеты только текущего пользователя)
#         response = self.client.get(self.searchLogList, {'own': 'true'})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#
#         #проверка параметра word (поиск тикета по строке)
#         response = self.client.get(self.searchLogList, {'word': self.ticketSearchData[0]['word']})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 2)
#
#         #проверка параметра limit (ограничение количества отдаваемых тикетов)
#         response = self.client.get(self.searchLogList, {'limit': 2})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 2)
#
#         #проверка параметра offset (сколько тикетов пропустить, начиная с самого нового)
#         response = self.client.get(self.searchLogList, {'offset': 2})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data), 1)
#
#     def tearDown(self):
#         self.client.logout()
