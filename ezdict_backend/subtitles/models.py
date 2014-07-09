import requests
import shutil
import zipfile
import os


class Subtitles:
    API_URL = 'http://api.ysubs.com'
    SUBS_URL = 'http://ysubs.com'
    SEARCH_URI = '/subs'
    FILES_PATH = '../files'
    FILES_URI = '/files'

    zipUrl = None
    imdbCode = None
    url = None

    def get(self, imdbCode):
        subtitles = Subtitles()
        subtitles.imdbCode = imdbCode
        r = requests.get(self.buildUrl(imdbCode))
        json = r.json()
        if int(json["subtitles"]) > 0:
            subtitles.zipUrl = json["subs"][imdbCode]["english"][0]["url"]

        return subtitles

    def unzip(self):
        response = requests.get(self.SUBS_URL + str(self.zipUrl), stream=True)
        zipPath = self.FILES_PATH + '/' + str(self.imdbCode) + '.zip'
        with open(zipPath, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
        del response
        out_file.close()
        zf = zipfile.ZipFile(zipPath)
        zinfo = zf.infolist()[0]
        zf.extract(zinfo, self.FILES_PATH)
        zf.close()
        os.remove(zipPath)
        self.url = self.FILES_URI + '/' + zinfo.filename
        return self.url

    def buildUrl(self, imdbId):
        return self.API_URL + self.SEARCH_URI + '/' + imdbId
