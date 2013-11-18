import requests


class YandexDict:
    DICT_API_KEY = 'dict.1.1.20131027T115553Z.881398786442095e.51bb0420197e3eecd21c1dff059a2636b3976867'
    DICT_API_URL = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
    LANG = 'en-ru'

    def __init__(self, word):
        self.word = word

    def lookup(self):
        payload = {'text': self.word, 'key': self.DICT_API_KEY, 'lang': self.LANG}
        r = requests.get(self.DICT_API_URL, params=payload)
        return r.json()


class YandexTranslate:
    TRANSLATE_API_KEY = 'trnsl.1.1.20131027T115234Z.fa108187c88cfaef.a410c2ed5ad3b5107f12fb7a31bf91de5b920fe7'
    TRANSLATE_API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    LANG = 'en-ru'

    def __init__(self, word):
        self.word = word

    def translate(self):
        payload = {'text': self.word, 'key': self.TRANSLATE_API_KEY, 'lang': self.LANG}
        r = requests.get(self.TRANSLATE_API_URL, params=payload)
        return r.json()