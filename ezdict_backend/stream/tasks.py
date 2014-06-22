from celery.task import task
import subprocess
import re
# other imports


@task
def start(data):
    url = None
    regexp = 'https?://.+:\d+/'
    proc = subprocess.Popen(
        ['peerflix', 'https://yts.re/download/start/CF70D983A67D8E88D0D2C42EDBD62CFCF998225E.torrent', '-r'],
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