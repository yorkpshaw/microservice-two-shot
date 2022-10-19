# Generated by Django 4.0.3 on 2022-10-19 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0002_rename_style_name_hat_style'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='locationvo',
            name='name',
        ),
        migrations.AddField(
            model_name='locationvo',
            name='section_number',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AddField(
            model_name='locationvo',
            name='shelf_number',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]