import requests


class Movie:
    API_URL = 'https://yts.re/api'
    TorrentUrl = None

    def get(self, movieId):
        movie = Movie()
        payload = {'id': movieId}
        r = requests.get(self.buildUrl('/movie'), params=payload)
        json = r.json()
        try:
            movie.TorrentUrl = json['TorrentUrl']
        except AttributeError:
            raise Exception("Movie not found")

        return movie

    def buildUrl(self, uri):
        return self.API_URL + uri + '.json'