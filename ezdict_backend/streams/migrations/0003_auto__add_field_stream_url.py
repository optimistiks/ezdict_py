# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Stream.url'
        db.add_column('streams_stream', 'url',
                      self.gf('django.db.models.fields.CharField')(max_length=255, default='test'),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Stream.url'
        db.delete_column('streams_stream', 'url')


    models = {
        'accounts.myuser': {
            'Meta': {'object_name': 'MyUser'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'db_index': 'True', 'max_length': '254', 'unique': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'nickname': ('django.db.models.fields.CharField', [], {'db_index': 'True', 'max_length': '255', 'unique': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'blank': 'True', 'auto_now': 'True'})
        },
        'streams.stream': {
            'Meta': {'object_name': 'Stream'},
            'closed': ('django.db.models.fields.DateTimeField', [], {'default': 'None'}),
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'movie_id': ('django.db.models.fields.IntegerField', [], {}),
            'p_id': ('django.db.models.fields.IntegerField', [], {}),
            'task_id': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'url': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'streams'", 'to': "orm['accounts.MyUser']"})
        }
    }

    complete_apps = ['streams']