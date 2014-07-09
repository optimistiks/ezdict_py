from rest_framework import status
from rest_framework.test import APITestCase
from subtitles.models import Subtitles
from accounts.models import MyUser
from django.core.urlresolvers import reverse


class YtsTest(APITestCase):
    def setUp(self):
        pass

    def test_find_subtitles_by_imdb_id(self):
        subtitles = Subtitles().get('tt1959490')
        self.assertEqual(subtitles.zipUrl,
                         '/subtitle/noah-yify-17110.zip')

    def test_unzip_subtitles(self):
        subtitles = Subtitles().get('tt1959490')
        srt = subtitles.unzip()
        self.assertEqual(srt, '/files/noah-yify-english.srt')

    def test_fetch_subtitles(self):
        user = MyUser.objects.create_user(
            nickname='testusr2', email='testusr2@gmail.com', password='qwerty')
        self.client.login(username=user.email, password='qwerty')
        url = reverse('subtitles', args=("json",))
        response = self.client.get(url, {"imdbCode": "tt2209764"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('url', response.data)

    def tearDown(self):
        pass
