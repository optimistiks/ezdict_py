from rest_framework import status
from rest_framework.test import APITestCase
from subtitles.models import Subtitles


class YtsTest(APITestCase):
    def setUp(self):
        pass

    def test_find_subtitles_by_imdb_id(self):
        subtitles = Subtitles().get(1959490)
        self.assertEqual(subtitles.zipUrl,
                         '/subtitle/noah-yify-17110.zip')

    def test_unzip_subtitles(self):
        subtitles = Subtitles().get(1959490)
        srt = subtitles.unzip()
        self.assertEqual(srt, 'noah-yify-english.srt')

    def tearDown(self):
        pass
