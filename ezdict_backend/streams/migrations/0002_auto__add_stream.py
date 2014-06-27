# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Stream'
        db.create_table('streams_stream', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('closed', self.gf('django.db.models.fields.DateTimeField')(default=None)),
            ('task_id', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('p_id', self.gf('django.db.models.fields.IntegerField')()),
            ('movie_id', self.gf('django.db.models.fields.IntegerField')()),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['accounts.MyUser'], related_name='streams')),
        ))
        db.send_create_signal('streams', ['Stream'])


    def backwards(self, orm):
        # Deleting model 'Stream'
        db.delete_table('streams_stream')


    models = {
        'accounts.myuser': {
            'Meta': {'object_name': 'MyUser'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '254', 'db_index': 'True', 'unique': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'nickname': ('django.db.models.fields.CharField', [], {'max_length': '255', 'db_index': 'True', 'unique': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        'streams.stream': {
            'Meta': {'object_name': 'Stream'},
            'closed': ('django.db.models.fields.DateTimeField', [], {'default': 'None'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'movie_id': ('django.db.models.fields.IntegerField', [], {}),
            'p_id': ('django.db.models.fields.IntegerField', [], {}),
            'task_id': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['accounts.MyUser']", 'related_name': "'streams'"})
        }
    }

    complete_apps = ['streams']