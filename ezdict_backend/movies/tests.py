from rest_framework import status
from rest_framework.test import APITestCase
from movies.models import Movie


class YtsTest(APITestCase):
    def setUp(self):
        pass

    def test_find_movie_by_id(self):
        movie = Movie().get(5400)
        self.assertEqual(movie.TorrentUrl,
                         'https://yts.re/download/start/ABF8AF1BCE328666EADD6FBFA48457BB9AEA1AE6.torrent')

    def tearDown(self):
        pass
