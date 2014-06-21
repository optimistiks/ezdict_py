from celery.task import task
import subprocess
import re
# other imports


@task
def start(data):
    regexp = 'https?://.+:\d+/'
    proc = subprocess.Popen([
                                'peerflix',
                                'https://yts.re/download/start/344E74A9B07EC8D3F00627A38F45483A3DB08A04.torrent',
                                '-r'
                            ],
                            stdout=subprocess.PIPE
                            )

    stdout = proc.stdout.readline()
    i = 0
    while stdout and i < 10:
        i += 1
        decoded = stdout.decode()
        match = re.search(regexp, decoded)
        if match is not None:
            print('match!', match.group())
        stdout = proc.stdout.readline()

    return None