# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Ticket'
        db.create_table('tickets_ticket', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('created', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('word', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('transcription', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('translation', self.gf('django.db.models.fields.TextField')()),
            ('liked', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal('tickets', ['Ticket'])


    def backwards(self, orm):
        # Deleting model 'Ticket'
        db.delete_table('tickets_ticket')


    models = {
        'tickets.ticket': {
            'Meta': {'ordering': "('created',)", 'object_name': 'Ticket'},
            'created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'liked': ('django.db.models.fields.IntegerField', [], {}),
            'transcription': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'translation': ('django.db.models.fields.TextField', [], {}),
            'updated': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'word': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        }
    }

    complete_apps = ['tickets']