from celery.task import task
import subprocess
import re
from streams.models import Stream
from movies.models import Movie

@task
def start(movieId, user):
    url = None
    regexp = 'https?://.+:\d+/'
    movie = Movie().get(movieId)

    proc = subprocess.Popen(
        ['trickle', 'nice', '-n', '20', 'peerflix', movie.TorrentUrl, '-r'],
        stdout=subprocess.PIPE)

    stdout = proc.stdout.readline()
    while stdout:
        decoded = stdout.decode()
        match = re.search(regexp, decoded)
        if match is not None:
            url = match.group()
            break
        stdout = proc.stdout.readline()

    stream = Stream(task_id=start.request.id, p_id=proc.pid, user=user, movie_id=movieId, url=url)
    stream.save()

    return stream


@task
def stop(stream):
    stream.stop()
    return None