import requests
import shutil
import zipfile
import os


class Subtitles:
    API_URL = 'http://api.ysubs.com'
    SUBS_URL = 'http://ysubs.com'
    SEARCH_URI = '/subs'
    FILES_PATH = '../files'

    zipUrl = None
    imdbId = None

    def get(self, imdbId):
        ttImdb = self.prepareImdbId(imdbId)
        subtitles = Subtitles()
        subtitles.imdbId = imdbId
        r = requests.get(self.buildUrl(ttImdb))
        json = r.json()
        if int(json["subtitles"]) > 0:
            subtitles.zipUrl = json["subs"][ttImdb]["english"][0]["url"]

        return subtitles

    def unzip(self):
        response = requests.get(self.SUBS_URL + str(self.zipUrl), stream=True)
        zipPath = self.FILES_PATH + '/' + str(self.imdbId) + '.zip'
        with open(zipPath, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
        del response
        out_file.close()
        zf = zipfile.ZipFile(zipPath)
        zinfo = zf.infolist()[0]
        zf.extract(zinfo, self.FILES_PATH)
        zf.close()
        os.remove(zipPath)
        return zinfo.filename

    def buildUrl(self, imdbId):
        return self.API_URL + self.SEARCH_URI + '/' + imdbId

    def prepareImdbId(self, imdbId):
        return 'tt' + str(imdbId)