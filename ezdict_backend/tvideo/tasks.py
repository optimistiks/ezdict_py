from celery.task import task
import subprocess
# other imports


@task
def stream(data):
    subprocess.Popen(['peerflix',
                      'https://yts.re/download/start/344E74A9B07EC8D3F00627A38F45483A3DB08A04.torrent'])
    return None