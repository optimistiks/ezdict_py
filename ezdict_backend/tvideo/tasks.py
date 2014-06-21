from celery.task import task
import subprocess
import re
# other imports


@task
def start(data):
    url = None
    regexp = 'https?://.+:\d+/'
    proc = subprocess.Popen(
        ['peerflix', 'https://yts.re/download/start/344E74A9B07EC8D3F00627A38F45483A3DB08A04.torrent', '-r'],
        stdout=subprocess.PIPE)

    stdout = proc.stdout.readline()
    while stdout:
        decoded = stdout.decode()
        match = re.search(regexp, decoded)
        if match is not None:
            url = match.group()
            break
        stdout = proc.stdout.readline()

    return url