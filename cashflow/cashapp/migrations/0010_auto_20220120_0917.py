# Generated by Django 3.2.8 on 2022-01-20 09:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashapp', '0009_auto_20220120_0917'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reminder',
            name='reminderTimeStamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 20, 9, 17, 27, 738725)),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='transactionTimeStamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2022, 1, 20, 9, 17, 27, 737724)),
        ),
        migrations.AlterField(
            model_name='userfraudadvisor',
            name='lastTransactionTS',
            field=models.DateTimeField(default=datetime.datetime(2022, 1, 20, 9, 17, 27, 738725)),
        ),
    ]